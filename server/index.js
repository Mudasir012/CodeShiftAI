import express from 'express';
import { attachUser } from './auth.js';
import { startEngine } from './engine.js';
import authRoutes from './routes/auth.js';
import repoRoutes from './routes/repos.js';
import jobRoutes from './routes/jobs.js';
import eventRoutes from './routes/events.js';
import statRoutes from './routes/stats.js';
import keyRoutes from './routes/keys.js';
import orchestrationRoutes from './routes/orchestration.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(attachUser);

app.use('/api/auth', authRoutes);
app.use('/api/repos', repoRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/keys', keyRoutes);
app.use('/api/orchestration', orchestrationRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error('[api] error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`CodeShiftAI API listening on http://localhost:${PORT}`);
  startEngine();
});
