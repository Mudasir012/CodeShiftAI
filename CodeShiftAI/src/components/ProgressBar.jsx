import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react'

export default function ProgressBar({ progress, status }) {
  const isActive = status === 'queued' || status === 'running'
  const isComplete = status === 'awaiting-review' || status === 'completed'
  const isFailed = status === 'failed' || status === 'validation-timeout'

  const barColor = isComplete ? 'bg-emerald-500' : isFailed ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-sm">
          {isActive && <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />}
          {isComplete && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {isFailed && <XCircle className="w-4 h-4 text-red-400" />}
          {status === 'queued' && <Clock className="w-4 h-4 text-gray-400" />}
          <span className="text-sm font-medium text-gray-300">
            {isComplete ? 'Migration complete' :
             isFailed ? 'Migration failed' :
             status === 'queued' ? 'Waiting in queue...' :
             `Migrating... ${progress}%`}
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-200">{progress}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
