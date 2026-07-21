import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react'

const stages = [
  { id: 0, label: 'Cloning', icon: 'clone' },
  { id: 1, label: 'Chunking', icon: 'chunk' },
  { id: 2, label: 'Translating', icon: 'translate' },
  { id: 3, label: 'Validating', icon: 'validate' },
  { id: 4, label: 'Ready for Review', icon: 'review' },
]

export default function ProgressStepper({ currentStage, status }) {
  const isFailed = status === 'failed' || status === 'validation-timeout'
  const isComplete = status === 'awaiting-review' || status === 'completed'

  return (
    <div className="flex items-center justify-between">
      {stages.map((stage, index) => {
        const isPast = index < currentStage
        const isCurrent = index === currentStage
        const isLast = index === stages.length - 1

        return (
          <div key={stage.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isPast || (isLast && isComplete)
                  ? 'bg-emerald-100 text-emerald-600'
                  : isCurrent && !isFailed
                  ? 'bg-violet-100 text-violet-600'
                  : isFailed && isCurrent
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {isPast || (isLast && isComplete) ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isCurrent && !isFailed ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isFailed && isCurrent ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <span className={`text-xs mt-1.5 whitespace-nowrap ${
                isPast || (isLast && isComplete) ? 'text-emerald-600 font-medium'
                : isCurrent ? 'text-violet-600 font-medium'
                : 'text-gray-400'
              }`}>
                {stage.label}
              </span>
            </div>
            {!isLast && (
              <div className={`flex-1 h-0.5 mx-2 ${
                index < currentStage ? 'bg-emerald-400' : isCurrent && !isFailed ? 'bg-violet-300' : 'bg-gray-200'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
