export const auditLogEntries = [
  { id: 'audit-1', jobId: 'job-1', timestamp: '2026-07-22T10:30:00Z', severity: 'INFO', action: 'Migration created', user: 'Mudasir Hussain', detail: 'Job queued for python-legacy-app: Python 2.7 → Python 3.12' },
  { id: 'audit-2', jobId: 'job-1', timestamp: '2026-07-22T10:30:05Z', severity: 'INFO', action: 'Repository cloned', user: 'System', detail: 'Cloned codeshift-eng/python-legacy-app@main (12.4 MB)' },
  { id: 'audit-3', jobId: 'job-1', timestamp: '2026-07-22T10:30:08Z', severity: 'INFO', action: 'AST parsing started', user: 'System', detail: 'Parsing 47 source files with Tree-sitter Python parser' },
  { id: 'audit-4', jobId: 'job-1', timestamp: '2026-07-22T10:30:12Z', severity: 'INFO', action: 'AST chunking completed', user: 'System', detail: '47 files → 162 chunks, 0 chunks exceeded context window' },
  { id: 'audit-5', jobId: 'job-1', timestamp: '2026-07-22T10:30:14Z', severity: 'INFO', action: 'RAG context retrieved', user: 'System', detail: 'Retrieved 28 relevant passages from Python 2→3 migration guide' },
  { id: 'audit-6', jobId: 'job-1', timestamp: '2026-07-22T10:30:20Z', severity: 'WARNING', action: 'LLM retry', user: 'System', detail: 'Chunk src/payments/gateway.py:8 failed syntax validation (attempt 1/3)' },
  { id: 'audit-7', jobId: 'job-1', timestamp: '2026-07-22T10:30:25Z', severity: 'INFO', action: 'LLM retry succeeded', user: 'System', detail: 'Chunk src/payments/gateway.py:8 passed on attempt 2/3' },
  { id: 'audit-8', jobId: 'job-1', timestamp: '2026-07-22T10:31:00Z', severity: 'INFO', action: 'LLM translation completed', user: 'System', detail: 'All 162 chunks translated. Avg 3.2s per chunk.' },
  { id: 'audit-9', jobId: 'job-1', timestamp: '2026-07-22T10:31:05Z', severity: 'INFO', action: 'Docker sandbox provisioned', user: 'System', detail: 'Container c7a3b2f1 (1 vCPU, 512 MB RAM, --network=none)' },
  { id: 'audit-10', jobId: 'job-1', timestamp: '2026-07-22T10:31:30Z', severity: 'INFO', action: 'Sandbox validation completed', user: 'System', detail: '42/45 tests passed. 3 test failures in src/payments/gateway.py' },
  { id: 'audit-11', jobId: 'job-1', timestamp: '2026-07-22T10:31:35Z', severity: 'INFO', action: 'Diff generated', user: 'System', detail: 'Unified diff generated: 8 files changed, 142 insertions, 98 deletions' },
  { id: 'audit-12', jobId: 'job-1', timestamp: '2026-07-22T10:32:00Z', severity: 'INFO', action: 'Ready for review', user: 'System', detail: 'Job moved to Awaiting Review status' },
  { id: 'audit-13', jobId: 'job-2', timestamp: '2026-07-21T15:00:00Z', severity: 'CRITICAL', action: 'Sandbox escape attempt detected', user: 'System', detail: 'Container e9f8d7c6: blocked syscall ptrace via seccomp. Container terminated.' },
  { id: 'audit-14', jobId: 'job-2', timestamp: '2026-07-21T15:00:01Z', severity: 'CRITICAL', action: 'Security alert triggered', user: 'System', detail: 'High-severity event escalated to workspace admin. Job flagged for security review.' },
  { id: 'audit-15', jobId: 'job-3', timestamp: '2026-07-20T11:00:00Z', severity: 'INFO', action: 'Migration completed', user: 'Shayan', detail: 'All hunks accepted. Branch codeshift-migrated pushed to cobol-batch.' },
  { id: 'audit-16', jobId: 'job-4', timestamp: '2026-07-19T09:30:00Z', severity: 'INFO', action: 'Migration created', user: 'Muhammad Hassan', detail: 'Job queued for java-ecommerce: Java 8 → Java 21' },
  { id: 'audit-17', jobId: 'job-4', timestamp: '2026-07-19T09:45:00Z', severity: 'WARNING', action: 'OAuth token refreshed', user: 'System', detail: 'Bitbucket access token was expired; refreshed via refresh token' },
  { id: 'audit-18', jobId: 'job-4', timestamp: '2026-07-19T10:30:00Z', severity: 'INFO', action: 'Sandbox timeout', user: 'System', detail: 'Test suite exceeded 300s timeout. Manual verification required.' },
  { id: 'audit-19', jobId: null, timestamp: '2026-07-18T14:00:00Z', severity: 'INFO', action: 'User login', user: 'Ghulam Murtaza', detail: 'Login from IP 203.0.113.42 (Chrome 126, Windows)' },
  { id: 'audit-20', jobId: null, timestamp: '2026-07-18T14:00:05Z', severity: 'INFO', action: 'OAuth connected', user: 'Ghulam Murtaza', detail: 'Connected GitLab account (gl-murtaza)' },
  { id: 'audit-21', jobId: 'job-3', timestamp: '2026-07-20T10:55:00Z', severity: 'INFO', action: 'Review hunk accepted', user: 'Shayan', detail: 'Accepted hunk hunk-1 in src/cobol/batch-processor.cbl' },
  { id: 'audit-22', jobId: 'job-3', timestamp: '2026-07-20T10:56:00Z', severity: 'INFO', action: 'Review hunk edited', user: 'Shayan', detail: 'Manually edited hunk hunk-2 in src/cobol/report-generator.cbl' },
  { id: 'audit-23', jobId: 'job-3', timestamp: '2026-07-20T10:57:00Z', severity: 'INFO', action: 'Export initiated', user: 'Shayan', detail: 'Exporting accepted changes to gitlab:cobol-batch/codeshift-migrated' },
  { id: 'audit-24', jobId: null, timestamp: '2026-07-17T09:00:00Z', severity: 'WARNING', action: 'GDPR erasure request', user: 'Mudasir Hussain', detail: 'Erasure request submitted for user user-5 (former team member)' },
  { id: 'audit-25', jobId: null, timestamp: '2026-07-17T09:00:10Z', severity: 'INFO', action: 'GDPR erasure completed', user: 'System', detail: 'All PII and source code for user-5 shredded. Audit trail anonymized.' },
]

export const getAuditLog = ({ status, search, page = 1, pageSize = 10 } = {}) => {
  let filtered = [...auditLogEntries]
  if (status && status !== 'all') {
    filtered = filtered.filter(e => e.severity === status)
  }
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(e =>
      e.action.toLowerCase().includes(q) ||
      e.user.toLowerCase().includes(q) ||
      e.detail.toLowerCase().includes(q)
    )
  }
  const total = filtered.length
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return Promise.resolve({ items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) })
}
