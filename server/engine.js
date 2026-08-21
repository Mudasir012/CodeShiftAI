import crypto from 'node:crypto';
import { db, now, logEvent } from './db.js';
import { STAGES } from './routes/jobs.js';

const TICK_MS = 2000;
const MAX_CONCURRENT = 3;

const LEGACY_LANGS = ['COBOL', 'Fortran', 'MUMPS', 'Delphi', 'VB6', 'Ada'];

const STAGE_SCOPES = {
  connect: 'GIT_CLONE',
  analyze: 'AST_PARSER',
  transform: 'LLM_PIPELINE',
  verify: 'TEST_RUNNER',
  bundle: 'PACKAGER',
};

const STAGE_LOGS = {
  connect: ['SSH handshake OK', 'Cloning working tree'],
  analyze: ['Building dependency graph', 'Indexing AST nodes', 'Mapping dead code paths'],
  transform: ['Chunking source units', 'Translating chunk batch', 'Stitching translated modules'],
  verify: ['Running behavioral test suite', 'Comparing execution traces', 'Checking equivalence threshold'],
  bundle: ['Compiling target artifacts', 'Linting output tree', 'Packaging release bundle'],
};

function pick(arr) {
  return arr[crypto.randomInt(arr.length)];
}

function detectLanguage(name) {
  const hash = crypto.createHash('sha1').update(name).digest()[0];
  return LEGACY_LANGS[hash % LEGACY_LANGS.length];
}

const DIFF_TEMPLATES = {
  COBOL: {
    header: 'IDENTIFICATION DIVISION.',
    body: ['PROCEDURE DIVISION.', 'PARA-CALC-TOTAL.', '    ADD WS-A TO WS-B GIVING WS-TOTAL.'],
  },
  Fortran: {
    header: 'PROGRAM LEGACY_CALC',
    body: ['INTEGER :: WS_A, WS_B, WS_TOTAL', 'WS_TOTAL = WS_A + WS_B', 'END PROGRAM LEGACY_CALC'],
  },
  MUMPS: {
    header: 'CALC ; routine entry',
    body: [' SET TOT=A+B', ' QUIT TOT'],
  },
  Delphi: {
    header: 'function CalcTotal: Integer;',
    body: ['begin', '  Result := A + B;', 'end;'],
  },
  VB6: {
    header: 'Function CalcTotal() As Long',
    body: ['    CalcTotal = A + B', 'End Function'],
  },
  Ada: {
    header: 'procedure Calc_Total is',
    body: ['   Total : Integer := A + B;', 'end Calc_Total;'],
  },
};

const TARGET_TEMPLATES = {
  go: [
    'func CalcTotal(a, b int) int {',
    '\treturn a + b',
    '}',
  ],
  python: [
    'def calc_total(a: int, b: int) -> int:',
    '    return a + b',
  ],
  rust: [
    'fn calc_total(a: i64, b: i64) -> i64 {',
    '    a + b',
    '}',
  ],
  typescript: [
    'export function calcTotal(a: number, b: number): number {',
    '  return a + b;',
    '}',
  ],
};

function buildDiff(sourceLang, targetLang, jobNumber) {
  const src = DIFF_TEMPLATES[sourceLang] || DIFF_TEMPLATES.COBOL;
  const before = [src.header, '', ...src.body].join('\n');
  const after = [
    TARGET_TEMPLATES[targetLang] ? `// JOB-${jobNumber} · ${sourceLang} → ${targetLang}` : '',
    ...(TARGET_TEMPLATES[targetLang] || TARGET_TEMPLATES.go),
  ]
    .filter(Boolean)
    .join('\n');
  return { before, after };
}

function setStage(jobId, idx, status) {
  const stamp = now();
  const startedAt = status === 'active' ? stamp : null;
  const finishedAt = status === 'done' || status === 'failed' ? stamp : null;
  db.prepare(
    `UPDATE job_stages SET status = ?,
       started_at = COALESCE(?, started_at),
       finished_at = COALESCE(?, finished_at)
     WHERE job_id = ? AND idx = ?`
  ).run(status, startedAt, finishedAt, jobId, idx);
}

function tickUser(userId) {
  const counts = db
    .prepare(
      `SELECT SUM(CASE WHEN status = 'running' THEN 1 ELSE 0 END) AS running,
              SUM(CASE WHEN status = 'queued' THEN 1 ELSE 0 END) AS queued
       FROM jobs WHERE user_id = ?`
    )
    .get(userId);

  let running = counts.running || 0;

  while (running < MAX_CONCURRENT) {
    const next = db
      .prepare(`SELECT * FROM jobs WHERE user_id = ? AND status = 'queued' ORDER BY created_at LIMIT 1`)
      .get(userId);
    if (!next) break;
    db.prepare(`UPDATE jobs SET status = 'running', updated_at = ? WHERE id = ?`).run(now(), next.id);
    setStage(next.id, 0, 'active');
    logEvent({
      userId,
      tag: 'GIT',
      scope: STAGE_SCOPES.connect,
      message: `JOB-${next.number} cloning ${next.repo_name}@${next.branch}`,
      jobId: next.id,
    });
    running++;
  }

  const actives = db
    .prepare(`SELECT * FROM jobs WHERE user_id = ? AND status = 'running' ORDER BY created_at`)
    .all(userId);

  for (const job of actives) {
    const progress = Math.min(100, job.progress + crypto.randomInt(2, 7));
    const stageIndex = Math.min(STAGES.length - 1, Math.floor(progress / (100 / STAGES.length)));

    if (job.stage_index === 0 && stageIndex > 0 && !job.loc_total) {
      const repo = db.prepare(`SELECT * FROM repos WHERE id = ?`).get(job.repo_id);
      if (repo) {
        const files = repo.files || crypto.randomInt(40, 220);
        const loc = repo.loc || files * crypto.randomInt(400, 900);
        const language = repo.language !== 'Unknown' ? repo.language : detectLanguage(repo.name);
        db.prepare(`UPDATE repos SET files = ?, loc = ?, language = ? WHERE id = ?`).run(files, loc, language, repo.id);
        if (job.source_lang !== language) {
          db.prepare(`UPDATE jobs SET source_lang = ? WHERE id = ?`).run(language, job.id);
        }
        db.prepare(`UPDATE jobs SET loc_total = ? WHERE id = ?`).run(loc, job.id);
      }
      logEvent({
        userId,
        tag: 'AUDIT',
        scope: STAGE_SCOPES.analyze,
        message: `JOB-${job.number} codebase indexed`,
        jobId: job.id,
      });
    }

    if (job.stage_index <= 2 && stageIndex >= 3 && !job.diff_before) {
      const src = db.prepare(`SELECT source_lang, target_lang FROM jobs WHERE id = ?`).get(job.id);
      const diff = buildDiff(src.source_lang, src.target_lang, job.number);
      db.prepare(`UPDATE jobs SET diff_before = ?, diff_after = ? WHERE id = ?`).run(diff.before, diff.after, job.id);
    }

    for (let i = job.stage_index; i <= stageIndex; i++) {
      if (i > job.stage_index || progress >= 100) setStage(job.id, i - 1, 'done');
      if (i > job.stage_index) setStage(job.id, i, 'active');
    }

    const failed =
      stageIndex >= 3 && progress < 100 && job.stage_index < 4 && crypto.randomInt(0, 100) < 4;

    if (failed) {
      db.prepare(
        `UPDATE jobs SET status = 'failed', error = ?, stage_index = ?, updated_at = ? WHERE id = ?`
      ).run('Equivalence verification below threshold (94.2%)', stageIndex, now(), job.id);
      setStage(job.id, stageIndex, 'failed');
      logEvent({
        userId,
        level: 'ERROR',
        tag: 'JOB',
        scope: STAGE_SCOPES[STAGES[stageIndex].id],
        message: `JOB-${job.number} failed at stage ${STAGES[stageIndex].name}`,
        jobId: job.id,
      });
      continue;
    }

    const locProcessed = Math.round(((job.loc_total || 0) * progress) / 100);
    db.prepare(`UPDATE jobs SET progress = ?, stage_index = ?, loc_processed = ?, updated_at = ? WHERE id = ?`)
      .run(progress, stageIndex, locProcessed, now(), job.id);

    if (progress >= 100) {
      for (let i = 0; i < STAGES.length; i++) setStage(job.id, i, 'done');
      logEvent({
        userId,
        tag: 'VERIFY',
        scope: STAGE_SCOPES.verify,
        message: `JOB-${job.number} equivalence verified — 0 regressions`,
        jobId: job.id,
      });
      logEvent({
        userId,
        tag: 'PIPELINE',
        scope: STAGE_SCOPES.bundle,
        message: `JOB-${job.number} complete — bundle exported`,
        jobId: job.id,
      });
    } else if (crypto.randomInt(0, 100) < 35) {
      logEvent({
        userId,
        tag: pick(['PIPELINE', 'LLM', 'AUDIT']),
        scope: STAGE_SCOPES[STAGES[stageIndex].id],
        message: `JOB-${job.number} ${pick(STAGE_LOGS[STAGES[stageIndex].id])} (${progress}%)`,
        jobId: job.id,
      });
    }
  }
}

export function startEngine() {
  setInterval(() => {
    try {
      const users = db.prepare(`SELECT DISTINCT user_id FROM jobs`).all();
      for (const { user_id } of users) tickUser(user_id);
    } catch (err) {
      console.error('[engine] tick failed:', err.message);
    }
  }, TICK_MS);
}
