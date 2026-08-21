import { Router } from 'express';
import { db, now, logEvent } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

const PROVIDERS = new Set(['github', 'gitlab', 'bitbucket']);

router.get('/', (req, res) => {
  const repos = db
    .prepare(`SELECT * FROM repos WHERE user_id = ? ORDER BY connected_at DESC`)
    .all(req.user.id);
  res.json({ repos });
});

router.post('/connect', (req, res) => {
  const { provider, owner, name } = req.body || {};
  if (!PROVIDERS.has(provider)) return res.status(400).json({ error: 'Unsupported provider' });
  if (!owner || !name) return res.status(400).json({ error: 'Owner and repository name are required' });

  try {
    const result = db
      .prepare(
        `INSERT INTO repos (user_id, provider, owner, name) VALUES (?, ?, ?, ?)`
      )
      .run(req.user.id, provider, owner.trim(), name.trim());
    const repo = db.prepare(`SELECT * FROM repos WHERE id = ?`).get(Number(result.lastInsertRowid));
    logEvent({
      userId: req.user.id,
      level: 'SECURITY',
      tag: 'GIT',
      scope: `OAUTH_${provider.toUpperCase()}`,
      message: `Connected ${provider}/${repo.owner}/${repo.name}`,
    });
    res.status(201).json({ repo });
  } catch (err) {
    if (String(err.message || '').includes('UNIQUE')) {
      return res.status(409).json({ error: 'This repository is already connected' });
    }
    throw err;
  }
});

router.delete('/:id', (req, res) => {
  const repo = db.prepare(`SELECT * FROM repos WHERE id = ? AND user_id = ?`).get(req.params.id, req.user.id);
  if (!repo) return res.status(404).json({ error: 'Repository not found' });
  db.prepare(`DELETE FROM repos WHERE id = ?`).run(repo.id);
  logEvent({
    userId: req.user.id,
    tag: 'GIT',
    scope: `OAUTH_${repo.provider.toUpperCase()}`,
    message: `Disconnected ${repo.provider}/${repo.owner}/${repo.name}`,
  });
  res.json({ ok: true, disconnected_at: now() });
});

export default router;
