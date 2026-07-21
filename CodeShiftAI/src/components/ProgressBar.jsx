import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react'

export default function ProgressBar({ progress, status }) {
  const isActive = status === 'queued' || status === 'running'
  const isComplete = status === 'awaiting-review' || status === 'completed'
  const isFailed = status === 'failed' || status === 'validation-timeout'

  const barColor = isComplete ? 'bg-emerald-500' : isFailed ? 'bg-red-500' : 'bg-violet-600'

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-sm">
          {isActive && <Loader2 className="w-4 h-4 text-violet-600 animate-spin" />}
          {isComplete && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          {isFailed && <XCircle className="w-4 h-4 text-red-500" />}
          {status === 'queued' && <Clock className="w-4 h-4 text-gray-400" />}
          <span className="text-sm font-medium text-gray-700">
            {isComplete ? 'Migration complete' :
             isFailed ? 'Migration failed' :
             status === 'queued' ? 'Waiting in queue...' :
             `Migrating... ${progress}%`}
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-900">{progress}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
