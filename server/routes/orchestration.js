import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

const DIRECTIVES = {
  connect: 'CLONE_REPOSITORY',
  analyze: 'MAP_AST_GRAPH',
  transform: 'TRANSLATE_CHUNKS',
  verify: 'VERIFY_EQUIVALENCE',
  bundle: 'EXPORT_BUNDLE',
};

router.get('/', (req, res) => {
  const jobs = db
    .prepare(
      `SELECT id, number, repo_name, branch, source_lang, target_lang, status, progress, stage_index
       FROM jobs WHERE user_id = ? AND status IN ('running','paused')
       ORDER BY created_at LIMIT 4`
    )
    .all(req.user.id);

  const latestStmt = db.prepare(
    `SELECT message FROM events WHERE job_id = ? ORDER BY id DESC LIMIT 1`
  );

  const workers = jobs.map((job, i) => ({
    slot: `LLM-${i + 1}`,
    jobId: job.id,
    jobNumber: job.number,
    repoName: job.repo_name,
    sourceLang: job.source_lang,
    targetLang: job.target_lang,
    progress: job.progress,
    status: job.status,
    directive: DIRECTIVES[['connect', 'analyze', 'transform', 'verify', 'bundle'][job.stage_index]] || 'IDLE',
    activity: latestStmt.get(job.id)?.message || null,
  }));

  const queued = db
    .prepare(`SELECT COUNT(*) AS c FROM jobs WHERE user_id = ? AND status = 'queued'`)
    .get(req.user.id).c;
  const completedToday = db
    .prepare(
      `SELECT COUNT(*) AS c FROM jobs
       WHERE user_id = ? AND status = 'complete' AND substr(updated_at,1,10) = substr(?,1,10)`
    )
    .get(req.user.id, new Date().toISOString()).c;

  res.json({
    orchestrator: {
      status: workers.some((w) => w.status === 'running') ? 'ACTIVE' : queued ? 'STANDBY' : 'IDLE',
      mode: 'AUTO',
      queuedJobs: queued,
      completedToday,
      activeWorkers: workers.filter((w) => w.status === 'running').length,
    },
    workers,
  });
});

export default router;
