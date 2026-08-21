import crypto from 'node:crypto';
import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const keys = db
    .prepare(`SELECT id, label, prefix, created_at, last_used_at FROM api_keys WHERE user_id = ? ORDER BY created_at DESC`)
    .all(req.user.id);
  res.json({ keys });
});

router.post('/', (req, res) => {
  const label = (req.body?.label || '').trim() || 'default';
  const secret = crypto.randomBytes(20).toString('hex');
  const fullKey = `cs_live_${secret}`;
  const prefix = fullKey.slice(0, 16);

  const result = db
    .prepare(`INSERT INTO api_keys (user_id, label, prefix, key_hash) VALUES (?, ?, ?, ?)`)
    .run(req.user.id, label, prefix, crypto.createHash('sha256').update(fullKey).digest('hex'));

  res.status(201).json({
    key: {
      id: Number(result.lastInsertRowid),
      label,
      prefix,
      created_at: new Date().toISOString(),
      last_used_at: null,
    },
    secret: fullKey,
  });
});

router.delete('/:id', (req, res) => {
  const key = db.prepare(`SELECT id FROM api_keys WHERE id = ? AND user_id = ?`).get(req.params.id, req.user.id);
  if (!key) return res.status(404).json({ error: 'API key not found' });
  db.prepare(`DELETE FROM api_keys WHERE id = ?`).run(key.id);
  res.json({ ok: true });
});

export default router;
