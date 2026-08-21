import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const totals = db
    .prepare(
      `SELECT
         COALESCE(SUM(loc_processed), 0) AS locProcessed,
         SUM(CASE WHEN status = 'running' THEN 1 ELSE 0 END) AS activePipelines,
         SUM(CASE WHEN status = 'complete' THEN 1 ELSE 0 END) AS jobsCompleted,
         SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS jobsFailed,
         SUM(CASE WHEN status IN ('queued','paused') THEN 1 ELSE 0 END) AS jobsWaiting,
         COUNT(*) AS totalJobs
       FROM jobs WHERE user_id = ?`
    )
    .get(req.user.id);

  const finished = (totals.jobsCompleted || 0) + (totals.jobsFailed || 0);
  const successRate = finished ? Math.round(((totals.jobsCompleted || 0) / finished) * 1000) / 10 : null;

  const repoCount = db.prepare(`SELECT COUNT(*) AS c FROM repos WHERE user_id = ?`).get(req.user.id).c;
  const eventCount = db.prepare(`SELECT COUNT(*) AS c FROM events WHERE user_id = ?`).get(req.user.id).c;

  res.json({
    stats: {
      locProcessed: totals.locProcessed || 0,
      activePipelines: totals.activePipelines || 0,
      jobsCompleted: totals.jobsCompleted || 0,
      jobsFailed: totals.jobsFailed || 0,
      successRate,
      reposConnected: repoCount,
      totalEvents: eventCount,
    },
  });
});

router.get('/contribution', (req, res) => {
  const rows = db
    .prepare(
      `SELECT substr(created_at, 1, 10) AS day, COUNT(*) AS count
       FROM jobs WHERE user_id = ? AND created_at >= ?
       GROUP BY day`
    )
    .all(req.user.id, new Date(Date.now() - 371 * 86400000).toISOString());

  const byDay = Object.fromEntries(rows.map((r) => [r.day, r.count]));
  const days = [];
  for (let i = 370; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    days.push({ date: d, count: byDay[d] || 0 });
  }
  res.json({ days });
});

export default router;
