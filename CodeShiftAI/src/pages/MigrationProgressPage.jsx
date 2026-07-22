import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Loader2, TestTube, Eye, AlertTriangle, RefreshCw, Download } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { getJob, createJob } from '../mock/migrations.js'
import ProgressStepper from '../components/ProgressStepper.jsx'
import LogConsole from '../components/LogConsole.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import PageContainer from '../components/PageContainer.jsx'

export default function MigrationProgressPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [logs, setLogs] = useState([])
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const [status, setStatus] = useState('loading')
  const [diffData, setDiffData] = useState(null)
  const [retrying, setRetrying] = useState(false)

  const job = state.currentJob || state.jobs.find(j => j.id === id)

  useEffect(() => {
    getJob(id).then(j => {
      if (j) {
        dispatch({ type: 'SET_CURRENT_JOB', payload: j })
        setLogs(j.log || [])
        setProgress(j.progress || 0)
        setStage(j.stage || 0)
        setStatus(j.status)
        setDiffData(j.diffProgress)
      } else {
        setStatus('not-found')
      }
    })
  }, [id, dispatch])

  const handleEvent = useCallback((event) => {
    switch (event.type) {
      case 'log':
        setLogs(prev => [...prev, { timestamp: event.timestamp, level: event.level, text: event.text }])
        break
      case 'progress':
        setProgress(event.progress)
        dispatch({ type: 'UPDATE_JOB', payload: { id, progress: event.progress } })
        break
      case 'stage':
        setStage(event.stage)
        dispatch({ type: 'UPDATE_JOB', payload: { id, stage: event.stage } })
        break
      case 'complete':
        setStatus('awaiting-review')
        dispatch({ type: 'UPDATE_JOB', payload: { id, status: 'awaiting-review', progress: 100 } })
        setDiffData({ filesChanged: 8, insertions: 142, deletions: 98, testResults: { passed: 42, failed: 3, total: 45 } })
        break
    }
  }, [id, dispatch])

  async function handleRetry() {
    if (!job) return
    setRetrying(true)
    const newJob = await createJob({
      repoId: job.repoId,
      repoName: job.repoName,
      branch: job.branch || 'main',
      sourceVersion: job.sourceVersion,
      targetVersion: job.targetVersion,
    })
    setRetrying(false)
    navigate(`/migrations/${newJob.id}`)
  }

  function handleDownloadPatch() {
    const content = `From: CodeShift AI <migration@codeshift.dev>
Date: ${new Date().toLocaleDateString()}
Subject: [PATCH] Migrated ${job?.sourceVersion} → ${job?.targetVersion}

---
diff --git a/src/main.py b/src/main.py
index abc123..def456 100644
--- a/src/main.py
+++ b/src/main.py
@@ -1,5 +1,7 @@
-def calculate_total(items):
-    total = 0
-    for item in items:
-        total += item['price'] * item['quantity']
-    return total
+def calculate_total(items: list[dict]) -> float:
+    return sum(item['price'] * item['quantity'] for item in items)
`;

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${job?.repoName || 'migration'}-${job?.sourceVersion || ''}-to-${job?.targetVersion || ''}.patch`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (status === 'loading') {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
        </div>
      </PageContainer>
    )
  }

  if (status === 'not-found') {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <h2 className="text-lg font-semibold text-gray-900">Job not found</h2>
          <p className="text-sm text-gray-500 mt-1">This migration job does not exist.</p>
          <button onClick={() => navigate('/')} className="mt-4 text-sm text-violet-600 hover:text-violet-800">Return to Dashboard</button>
        </div>
      </PageContainer>
    )
  }

  const isActive = status === 'queued' || status === 'running'
  const isComplete = status === 'awaiting-review' || status === 'completed'
  const isFailed = status === 'failed' || status === 'validation-timeout'

  return (
    <PageContainer>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{job?.repoName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{job?.sourceVersion} &rarr; {job?.targetVersion}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isComplete && (
              <button
                onClick={handleDownloadPatch}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Patch
              </button>
            )}
            {isFailed && (
              <button
                onClick={handleRetry}
                disabled={retrying}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
                {retrying ? 'Retrying...' : 'Retry Migration'}
              </button>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
              isActive ? 'bg-blue-50 text-blue-700' :
              isComplete ? 'bg-emerald-50 text-emerald-700' :
              'bg-red-50 text-red-700'
            }`}>
              {isActive && <Loader2 className="w-3 h-3 animate-spin" />}
              {job?.status?.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Progress</h2>
            <ProgressStepper currentStage={stage} status={status} />
            <div className="mt-4">
              <ProgressBar progress={progress} status={status} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Console Log</h2>
              <span className="text-xs text-gray-400">{logs.length} entries</span>
            </div>
            <LogConsole logs={logs} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Migration Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Source</span>
                <span className="font-medium">{job?.sourceVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Target</span>
                <span className="font-medium">{job?.targetVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Branch</span>
                <span className="font-medium">{job?.branch || 'main'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created</span>
                <span className="font-medium">{job?.createdAt ? new Date(job.createdAt).toLocaleString() : '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium">{job?.duration || 'In progress...'}</span>
              </div>
            </div>
          </div>

          {diffData && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Diff Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{diffData.filesChanged} files changed</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">+</span>
                  <span>{diffData.insertions} insertions</span>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">-</span>
                  <span>{diffData.deletions} deletions</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <TestTube className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Tests: </span>
                    <span className="text-emerald-600 font-medium">{diffData.testResults.passed} passed</span>
                    {diffData.testResults.failed > 0 && (
                      <>
                        <span className="text-gray-400">/</span>
                        <span className="text-red-600 font-medium">{diffData.testResults.failed} failed</span>
                      </>
                    )}
                    <span className="text-gray-400">/ {diffData.testResults.total} total</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isComplete && (
            <button
              onClick={() => navigate(`/migrations/${id}/review`)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4" />
              Review Changes
            </button>
          )}

          {isFailed && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-800">Migration Failed</h4>
                  <p className="text-xs text-red-600 mt-1">
                    {status === 'failed' ? 'The migration encountered an error during processing.' : 'The validation test suite timed out.'}
                  </p>
                  <button
                    onClick={handleRetry}
                    disabled={retrying}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:text-red-800 transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${retrying ? 'animate-spin' : ''}`} />
                    {retrying ? 'Retrying...' : 'Retry this migration'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
