import { Router } from 'express';
import { db, now, logEvent, nextJobNumber } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

export const STAGES = [
  { id: 'connect', name: 'Connect Repository' },
  { id: 'analyze', name: 'Analyze Codebase' },
  { id: 'transform', name: 'LLM Transformation' },
  { id: 'verify', name: 'Equivalence Verification' },
  { id: 'bundle', name: 'Bundle & Export' },
];

const TARGET_LANGS = new Set(['go', 'python', 'rust', 'typescript']);

function createStages(jobId) {
  const insert = db.prepare(
    `INSERT INTO job_stages (job_id, idx, name) VALUES (?, ?, ?)`
  );
  STAGES.forEach((s, i) => insert.run(jobId, i, s.id));
}

router.get('/', (req, res) => {
  const jobs = db
    .prepare(`SELECT * FROM jobs WHERE user_id = ? ORDER BY created_at DESC`)
    .all(req.user.id);
  res.json({ jobs });
});

router.post('/', (req, res) => {
  const { repo_id, branch, target_lang } = req.body || {};
  const repo = db
    .prepare(`SELECT * FROM repos WHERE id = ? AND user_id = ?`)
    .get(repo_id, req.user.id);
  if (!repo) return res.status(400).json({ error: 'A connected repository is required' });
  if (!TARGET_LANGS.has(target_lang)) {
    return res.status(400).json({ error: 'target_lang must be one of: go, python, rust, typescript' });
  }

  const number = nextJobNumber();
  const result = db
    .prepare(
      `INSERT INTO jobs (number, user_id, repo_id, repo_name, branch, source_lang, target_lang)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(number, req.user.id, repo.id, `${repo.owner}/${repo.name}`, branch || repo.default_branch, repo.language, target_lang);

  const jobId = Number(result.lastInsertRowid);
  createStages(jobId);

  logEvent({
    userId: req.user.id,
    tag: 'JOB',
    scope: 'PIPELINE',
    message: `JOB-${number} queued — ${repo.language} → ${target_lang} (${repo.owner}/${repo.name})`,
    jobId,
  });

  const job = db.prepare(`SELECT * FROM jobs WHERE id = ?`).get(jobId);
  res.status(201).json({ job });
});

router.get('/:id', (req, res) => {
  const job = db.prepare(`SELECT * FROM jobs WHERE id = ? AND user_id = ?`).get(req.params.id, req.user.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  const stages = db
    .prepare(`SELECT idx, name, status, started_at, finished_at FROM job_stages WHERE job_id = ? ORDER BY idx`)
    .all(job.id);
  res.json({ job, stages });
});

function transition(req, res, action) {
  const job = db.prepare(`SELECT * FROM jobs WHERE id = ? AND user_id = ?`).get(req.params.id, req.user.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  if (action === 'pause') {
    if (job.status !== 'running') return res.status(409).json({ error: 'Only running jobs can be paused' });
    db.prepare(`UPDATE jobs SET status = 'paused', updated_at = ? WHERE id = ?`).run(now(), job.id);
    logEvent({ userId: req.user.id, tag: 'JOB', scope: 'PIPELINE', message: `JOB-${job.number} paused by operator`, jobId: job.id });
  }

  if (action === 'resume') {
    if (job.status !== 'paused') return res.status(409).json({ error: 'Only paused jobs can be resumed' });
    db.prepare(`UPDATE jobs SET status = 'running', updated_at = ? WHERE id = ?`).run(now(), job.id);
    logEvent({ userId: req.user.id, tag: 'JOB', scope: 'PIPELINE', message: `JOB-${job.number} resumed by operator`, jobId: job.id });
  }

  if (action === 'retry') {
    if (job.status !== 'failed') return res.status(409).json({ error: 'Only failed jobs can be retried' });
    db.prepare(
      `UPDATE jobs SET status = 'queued', progress = 0, stage_index = 0, loc_processed = 0, error = NULL, updated_at = ? WHERE id = ?`
    ).run(now(), job.id);
    db.prepare(`UPDATE job_stages SET status = 'pending', started_at = NULL, finished_at = NULL WHERE job_id = ?`).run(job.id);
    logEvent({ userId: req.user.id, tag: 'JOB', scope: 'PIPELINE', message: `JOB-${job.number} re-queued by operator`, jobId: job.id });
  }

  const updated = db.prepare(`SELECT * FROM jobs WHERE id = ?`).get(job.id);
  res.json({ job: updated });
}

router.post('/:id/pause', (req, res) => transition(req, res, 'pause'));
router.post('/:id/resume', (req, res) => transition(req, res, 'resume'));
router.post('/:id/retry', (req, res) => transition(req, res, 'retry'));

export default router;
