import { Router } from 'express';
import { db } from '../db.js';
import { hashPassword, verifyPassword, createSession, destroySession } from '../auth.js';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/register', (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'Valid email required' });
  if (!password || password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

  const exists = db.prepare(`SELECT id FROM users WHERE email = ?`).get(email.toLowerCase());
  if (exists) return res.status(409).json({ error: 'An account with this email already exists' });

  const result = db
    .prepare(`INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)`)
    .run(email.toLowerCase(), (name || '').trim(), hashPassword(password));

  const user = { id: Number(result.lastInsertRowid), email: email.toLowerCase(), name: (name || '').trim() };
  const session = createSession(user.id);
  res.status(201).json({ token: session.token, expiresAt: session.expiresAt, user });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const row = db.prepare(`SELECT id, email, name, password_hash FROM users WHERE email = ?`).get(email.toLowerCase());
  if (!row || !verifyPassword(password, row.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const session = createSession(row.id);
  res.json({ token: session.token, expiresAt: session.expiresAt, user: { id: row.id, email: row.email, name: row.name } });
});

router.post('/logout', (req, res) => {
  destroySession(req.token);
  res.json({ ok: true });
});

router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Authentication required' });
  res.json({ user: req.user });
});

export default router;
