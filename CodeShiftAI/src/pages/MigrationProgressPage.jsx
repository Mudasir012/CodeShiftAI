import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Loader2, TestTube, Eye, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { getJob } from '../mock/migrations.js'
import ProgressStepper from '../components/ProgressStepper.jsx'
import LogConsole from '../components/LogConsole.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

export default function MigrationProgressPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [logs, setLogs] = useState([])
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const [status, setStatus] = useState('loading')
  const [diffData, setDiffData] = useState(null)

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

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-semibold text-white">Job not found</h2>
        <p className="text-sm text-gray-500 mt-1">This migration job does not exist.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-sm text-purple-400 hover:text-purple-300">Return to Dashboard</button>
      </div>
    )
  }

  const isActive = status === 'queued' || status === 'running'
  const isComplete = status === 'awaiting-review' || status === 'completed'
  const isFailed = status === 'failed' || status === 'validation-timeout'

  return (
    <div>
      <button onClick={() => navigate('/')} className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="glass-card rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-semibold text-white">{job?.repoName}</h1>
            <p className="text-sm text-gray-400">{job?.sourceVersion} &rarr; {job?.targetVersion}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            isActive ? 'glass text-blue-300 border border-blue-500/20' :
            isComplete ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
            'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {isActive && <Loader2 className="w-3 h-3 animate-spin" />}
            {job?.status?.replace('-', ' ')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6 mb-4">
            <h2 className="text-sm font-medium text-gray-300 mb-4">Pipeline Progress</h2>
            <ProgressStepper currentStage={stage} status={status} />
            <div className="mt-4">
              <ProgressBar progress={progress} status={status} />
            </div>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-300">Console Log</h2>
              <span className="text-xs text-gray-500">{logs.length} entries</span>
            </div>
            <LogConsole logs={logs} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Migration Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Source</span>
                <span className="font-medium text-gray-200">{job?.sourceVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Target</span>
                <span className="font-medium text-gray-200">{job?.targetVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Branch</span>
                <span className="font-medium text-gray-200">{job?.branch || 'main'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created</span>
                <span className="font-medium text-gray-200">{job?.createdAt ? new Date(job.createdAt).toLocaleString() : '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium text-gray-200">{job?.duration || 'In progress...'}</span>
              </div>
            </div>
          </div>

          {diffData && (
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Diff Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{diffData.filesChanged} files changed</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">+</span>
                  <span>{diffData.insertions} insertions</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">-</span>
                  <span>{diffData.deletions} deletions</span>
                </div>
                <div className="border-t border-white/5 pt-2 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <TestTube className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">Tests: </span>
                    <span className="text-emerald-400 font-medium">{diffData.testResults.passed} passed</span>
                    {diffData.testResults.failed > 0 && (
                      <>
                        <span className="text-gray-600">/</span>
                        <span className="text-red-400 font-medium">{diffData.testResults.failed} failed</span>
                      </>
                    )}
                    <span className="text-gray-500">/ {diffData.testResults.total} total</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isComplete && (
            <button
              onClick={() => navigate(`/migrations/${id}/review`)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
            >
              <Eye className="w-4 h-4" />
              Review Changes
            </button>
          )}

          {isFailed && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-300">Migration Failed</h4>
                  <p className="text-xs text-red-400 mt-1">
                    {status === 'failed' ? 'The migration encountered an error during processing.' : 'The validation test suite timed out.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
