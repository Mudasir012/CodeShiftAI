import { Loader2, ArrowUpRight } from 'lucide-react'

export default function FinalizeBar({ allReviewed, anyAccepted, totalHunks, reviewedHunks, onFinalize, finalizing, decisions = {} }) {
  const acceptedCount = Object.values(decisions).filter(d => d === 'accepted').length
  const rejectedCount = Object.values(decisions).filter(d => d === 'rejected').length
  const editedCount = Object.values(decisions).filter(d => d === 'edited').length

  return (
    <div className="flex-shrink-0 glass-card rounded-t-2xl px-6 py-3 flex items-center justify-between border-b-0">
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-gray-400">{acceptedCount} accepted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-gray-400">{rejectedCount} rejected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-gray-400">{editedCount} edited</span>
        </div>
        <span className="text-gray-600">|</span>
        <span className={`font-medium ${allReviewed ? 'text-emerald-400' : 'text-amber-400'}`}>
          {reviewedHunks}/{totalHunks} reviewed
        </span>
      </div>

      <button
        onClick={onFinalize}
        disabled={!allReviewed || !anyAccepted || finalizing}
        className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25"
      >
        {finalizing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <ArrowUpRight className="w-4 h-4" />
            Finalize & Export
          </>
        )}
      </button>
    </div>
  )
}
