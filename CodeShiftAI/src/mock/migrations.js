import { auditLogEntries } from './audit-log.js'

let jobCounter = 5

const mockJobs = [
  {
    id: 'job-1',
    repoId: 'repo-1',
    repoName: 'python-legacy-app',
    sourceVersion: 'Python 2.7',
    targetVersion: 'Python 3.12',
    status: 'awaiting-review',
    progress: 100,
    stage: 4,
    createdBy: 'Mudasir Hussain',
    createdAt: '2026-07-22T10:30:00Z',
    completedAt: null,
    duration: null,
    log: [
      { timestamp: '10:30:00', level: 'info', text: 'Job queued — waiting for available worker...' },
      { timestamp: '10:30:02', level: 'info', text: 'Worker assigned — starting repository clone' },
      { timestamp: '10:30:05', level: 'info', text: 'Repository cloned (12.4 MB, 47 files)' },
      { timestamp: '10:30:08', level: 'info', text: 'Parsing source files with Tree-sitter...' },
      { timestamp: '10:30:12', level: 'info', text: 'AST parsing complete — 47 files parsed' },
      { timestamp: '10:30:12', level: 'info', text: 'Chunking ASTs along semantic boundaries...' },
      { timestamp: '10:30:14', level: 'info', text: 'Chunking complete — 162 chunks created' },
      { timestamp: '10:30:14', level: 'info', text: 'Retrieving RAG context from migration guides...' },
      { timestamp: '10:30:16', level: 'info', text: 'RAG context retrieved (28 passages)' },
      { timestamp: '10:30:16', level: 'info', text: 'Submitting chunks to LLM for translation...' },
      { timestamp: '10:30:20', level: 'warn', text: 'Chunk src/payments/gateway.py:8 — syntax validation FAILED (retry 1/3)' },
      { timestamp: '10:30:22', level: 'info', text: 'Retrying chunk with adjusted prompt...' },
      { timestamp: '10:30:25', level: 'info', text: 'Chunk retry 2/3 — syntax validation PASSED' },
      { timestamp: '10:31:00', level: 'info', text: 'LLM translation completed — all 162 chunks translated' },
      { timestamp: '10:31:02', level: 'info', text: 'Reassembling migrated codebase...' },
      { timestamp: '10:31:05', level: 'info', text: 'Provisioning Docker sandbox container...' },
      { timestamp: '10:31:08', level: 'info', text: 'Sandbox ready — executing test suite (pytest)' },
      { timestamp: '10:31:30', level: 'info', text: 'Tests: 42 passed, 3 failed (45 total)' },
      { timestamp: '10:31:30', level: 'warn', text: '3 test failures in src/payments/gateway.py — flagged for review' },
      { timestamp: '10:31:32', level: 'info', text: 'Generating unified diff...' },
      { timestamp: '10:31:35', level: 'info', text: 'Diff generated — 8 files changed, +142 / -98' },
      { timestamp: '10:31:35', level: 'info', text: '✅ Ready for review — waiting for developer input' },
    ],
    diffProgress: { filesChanged: 8, insertions: 142, deletions: 98, testResults: { passed: 42, failed: 3, total: 45 } },
  },
  {
    id: 'job-2',
    repoId: 'repo-2',
    repoName: 'js-monolith',
    sourceVersion: 'JavaScript ES5',
    targetVersion: 'TypeScript 5.x',
    status: 'failed',
    progress: 65,
    stage: 3,
    createdBy: 'Ghulam Murtaza',
    createdAt: '2026-07-21T14:55:00Z',
    completedAt: '2026-07-21T15:00:01Z',
    duration: '5m 1s',
    log: [
      { timestamp: '14:55:00', level: 'info', text: 'Job queued' },
      { timestamp: '14:55:05', level: 'info', text: 'Cloning js-monolith@master...' },
      { timestamp: '14:55:10', level: 'info', text: 'Clone complete (89 files)' },
      { timestamp: '14:55:12', level: 'info', text: 'AST parsing and chunking complete' },
      { timestamp: '14:55:15', level: 'info', text: 'RAG context retrieved (15 passages)' },
      { timestamp: '14:55:20', level: 'info', text: 'LLM translation started...' },
      { timestamp: '14:58:30', level: 'info', text: 'Translation complete — 203 chunks processed' },
      { timestamp: '14:58:35', level: 'info', text: 'Provisioning Docker sandbox...' },
      { timestamp: '14:58:40', level: 'info', text: 'Sandbox container e9f8d7c6 provisioned' },
      { timestamp: '14:59:00', level: 'warn', text: 'npm install failed — dependency conflict in package.json' },
      { timestamp: '14:59:30', level: 'critical', text: '⚠️ SANDBOX ESCAPE DETECTED — syscall ptrace blocked by seccomp' },
      { timestamp: '14:59:31', level: 'critical', text: 'Container e9f8d7c6 terminated. Security team notified.' },
      { timestamp: '15:00:00', level: 'critical', text: 'Job failed — mandatory security review required' },
    ],
    diffProgress: null,
  },
  {
    id: 'job-3',
    repoId: 'repo-3',
    repoName: 'cobol-batch',
    sourceVersion: 'COBOL-85',
    targetVersion: 'Java 21',
    status: 'completed',
    progress: 100,
    stage: 4,
    createdBy: 'Shayan',
    createdAt: '2026-07-20T10:00:00Z',
    completedAt: '2026-07-20T10:57:00Z',
    duration: '57m',
    log: [
      { timestamp: '10:00:00', level: 'info', text: 'Job queued' },
      { timestamp: '10:05:00', level: 'info', text: 'Repository cloned' },
      { timestamp: '10:08:00', level: 'info', text: 'AST parsing complete (12 COBOL programs)' },
      { timestamp: '10:10:00', level: 'info', text: 'Chunking complete — 48 chunks' },
      { timestamp: '10:30:00', level: 'info', text: 'LLM translation completed (avg 8.5s/chunk)' },
      { timestamp: '10:35:00', level: 'info', text: 'Java compilation succeeded — no syntax errors' },
      { timestamp: '10:40:00', level: 'info', text: 'Test suite executed: 18/18 passed' },
      { timestamp: '10:45:00', level: 'info', text: 'Diff generated — 12 files changed' },
      { timestamp: '10:50:00', level: 'info', text: 'Review completed — all hunks accepted' },
      { timestamp: '10:57:00', level: 'info', text: '✅ Branch codeshift-migrated pushed to cobol-batch' },
    ],
    diffProgress: { filesChanged: 12, insertions: 890, deletions: 620, testResults: { passed: 18, failed: 0, total: 18 } },
  },
  {
    id: 'job-4',
    repoId: 'repo-4',
    repoName: 'java-ecommerce',
    sourceVersion: 'Java 8',
    targetVersion: 'Java 21',
    status: 'validation-timeout',
    progress: 85,
    stage: 3,
    createdBy: 'Muhammad Hassan',
    createdAt: '2026-07-19T09:30:00Z',
    completedAt: '2026-07-19T10:30:00Z',
    duration: '60m',
    log: [
      { timestamp: '09:30:00', level: 'info', text: 'Job queued' },
      { timestamp: '09:32:00', level: 'info', text: 'Repository cloned (Java 8, Maven project)' },
      { timestamp: '09:35:00', level: 'info', text: 'AST parsing complete (124 files)' },
      { timestamp: '09:40:00', level: 'info', text: 'Chunking complete — 312 chunks' },
      { timestamp: '10:00:00', level: 'info', text: 'LLM translation completed' },
      { timestamp: '10:05:00', level: 'info', text: 'Sandbox provisioning...' },
      { timestamp: '10:08:00', level: 'info', text: 'Maven build started...' },
      { timestamp: '10:25:00', level: 'warn', text: 'Test suite still running (elapsed: 17 min)' },
      { timestamp: '10:30:00', level: 'warn', text: '⏱️ Test suite exceeded 300s timeout — container terminated' },
      { timestamp: '10:30:00', level: 'info', text: 'Manual verification required for this migration' },
    ],
    diffProgress: null,
  },
]

export function getJobs() {
  return Promise.resolve([...mockJobs])
}

export function getJob(id) {
  const job = mockJobs.find(j => j.id === id)
  return Promise.resolve(job ? { ...job } : null)
}

export function createJob({ repoId, repoName, branch, sourceVersion, targetVersion }) {
  const id = `job-${++jobCounter}`
  const now = new Date().toISOString()
  const job = {
    id,
    repoId,
    repoName,
    sourceVersion,
    targetVersion,
    status: 'queued',
    progress: 0,
    stage: 0,
    createdBy: 'You',
    createdAt: now,
    completedAt: null,
    duration: null,
    log: [
      { timestamp: new Date().toLocaleTimeString(), level: 'info', text: 'Job queued — starting migration pipeline...' },
    ],
    diffProgress: null,
  }
  mockJobs.unshift(job)
  return Promise.resolve(job)
}

export function streamProgress(jobId, onEvent) {
  const job = mockJobs.find(j => j.id === jobId)
  if (!job) return () => {}

  const stages = [
    { stage: 0, label: 'Cloning', progressRange: [0, 15] },
    { stage: 1, label: 'Chunking', progressRange: [15, 35] },
    { stage: 2, label: 'Translating', progressRange: [35, 75] },
    { stage: 3, label: 'Validating', progressRange: [75, 95] },
    { stage: 4, label: 'Ready for Review', progressRange: [95, 100] },
  ]

  let currentStage = job.stage
  let currentProgress = job.progress
  let cancelled = false

  const mockLogLines = [
    'Initializing worker environment...',
    'Fetching repository metadata...',
    'Cloning repository (this may take a moment)...',
    'Clone complete — analyzing repository structure...',
    'Detecting project language and dependencies...',
    'Installing language-specific parser...',
    'Parsing source files into Abstract Syntax Trees...',
    'Tree-sitter parsing complete — building AST index...',
    'Chunking ASTs along semantic boundaries...',
    'All chunks within context window — no splitting needed',
    'Retrieving RAG context from language migration guides...',
    'Migration guide passages retrieved successfully',
    'Constructing LLM prompts with RAG context...',
    'Submitting batch 1 of chunks to LLM...',
    'LLM batch 1 complete — all responses syntactically valid',
    'Submitting batch 2 of chunks to LLM...',
    'LLM batch 2 complete — 1 chunk failed validation, retrying...',
    'Retry successful — all chunks translated',
    'Reassembling migrated codebase from chunks...',
    'Checking import consistency across migrated files...',
    'Provisioning isolated Docker sandbox container...',
    'Sandbox ready — network restricted, read-only root FS',
    'Copying migrated code and test suite to sandbox...',
    'Executing test suite inside sandbox...',
    'Tests running...',
    'Test suite execution complete — analyzing results...',
    'Generating unified diff of all changes...',
    'Diff generation complete',
    '✅ Migration pipeline finished — ready for review',
  ]
  let logIndex = 0

  function tick() {
    if (cancelled) return

    if (currentStage < stages.length) {
      const stage = stages[currentStage]
      const [minP, maxP] = stage.progressRange
      const increment = Math.random() * 3 + 1
      currentProgress = Math.min(currentProgress + increment, maxP)

      if (logIndex < mockLogLines.length) {
        onEvent({
          type: 'log',
          text: mockLogLines[logIndex],
          timestamp: new Date().toLocaleTimeString(),
          level: logIndex === 24 ? 'warn' : logIndex === 15 ? 'warn' : 'info',
        })
        logIndex++
      }

      if (currentProgress >= maxP && currentStage < stages.length - 1) {
        currentStage++
        onEvent({ type: 'stage', stage: currentStage, label: stages[currentStage].label })
      }

      onEvent({ type: 'progress', progress: Math.round(currentProgress) })
      job.progress = Math.round(currentProgress)
      job.stage = currentStage

      if (currentStage === stages.length - 1 && currentProgress >= 100) {
        job.status = 'awaiting-review'
        onEvent({ type: 'complete', status: 'awaiting-review' })
        return
      }
    }

    setTimeout(tick, 700 + Math.random() * 800)
  }

  setTimeout(tick, 500)
  return () => { cancelled = true }
}

export function submitReview(jobId, decisions) {
  const job = mockJobs.find(j => j.id === jobId)
  if (job) {
    job.status = 'completed'
    job.completedAt = new Date().toISOString()
    job.duration = '~5 min'
  }
  return Promise.resolve({ success: true, status: 'completed' })
}

export function getAuditLogForJob(jobId) {
  const entries = auditLogEntries.filter(e => e.jobId === jobId)
  return Promise.resolve(entries)
}
