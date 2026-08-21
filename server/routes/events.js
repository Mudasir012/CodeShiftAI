import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const { level, tag, since, limit = 100 } = req.query;
  const clauses = ['user_id = @userId'];
  const params = { userId: req.user.id };
  if (level) { clauses.push('level = @level'); params.level = String(level).toUpperCase(); }
  if (tag) { clauses.push('tag = @tag'); params.tag = String(tag).toUpperCase(); }
  if (since) { clauses.push('id > @since'); params.since = Number(since) || 0; }

  const rows = db
    .prepare(
      `SELECT id, level, tag, scope, message, job_id, created_at
       FROM events WHERE ${clauses.join(' AND ')}
       ORDER BY id DESC LIMIT @limit`
    )
    .all({ ...params, limit: Math.min(Number(limit) || 100, 500) });
  res.json({ events: rows, lastId: rows.length ? rows[0].id : Number(since) || 0 });
});

router.get('/stats', (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const count = (extra) =>
    db.prepare(`SELECT COUNT(*) AS c FROM events WHERE user_id = ? AND created_at >= ? ${extra}`)
      .get(req.user.id, startOfDay.toISOString()).c;

  res.json({
    stats: {
      today: count(''),
      security: count(`AND level = 'SECURITY'`),
      warnings: count(`AND level = 'WARN'`),
      errors: count(`AND level = 'ERROR'`),
    },
  });
});

export default router;
