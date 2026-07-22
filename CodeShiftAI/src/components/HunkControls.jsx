import { useState } from 'react'
import { Check, X, Edit3, MessageSquare, Save } from 'lucide-react'

export default function HunkControls({ hunkId, decision, onDecision, migrated }) {
  const [editing, setEditing] = useState(false)
  const [editedCode, setEditedCode] = useState(migrated)
  const [comment, setComment] = useState('')
  const [showComment, setShowComment] = useState(false)

  function handleSaveEdit() {
    onDecision(hunkId, 'edited')
    setEditing(false)
  }

  const buttonBase = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all'

  if (editing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editedCode}
          onChange={e => setEditedCode(e.target.value)}
          className="w-full h-32 font-mono text-xs p-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 resize-none"
        />
        <div className="flex items-center gap-2">
          <button onClick={handleSaveEdit} className={`${buttonBase} bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20`}>
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={() => setEditing(false)} className={`${buttonBase} border-white/10 text-gray-400 hover:bg-white/5`}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecision(hunkId, 'accepted')}
          className={`${buttonBase} ${
            decision === 'accepted'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'border-white/10 text-gray-400 hover:bg-emerald-500/10 hover:border-emerald-500/30'
          }`}
        >
          <Check className="w-3.5 h-3.5" /> Accept
        </button>
        <button
          onClick={() => onDecision(hunkId, 'rejected')}
          className={`${buttonBase} ${
            decision === 'rejected'
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'border-white/10 text-gray-400 hover:bg-red-500/10 hover:border-red-500/30'
          }`}
        >
          <X className="w-3.5 h-3.5" /> Reject
        </button>
        <button
          onClick={() => { setEditedCode(migrated); setEditing(true) }}
          className={`${buttonBase} border-white/10 text-gray-400 hover:bg-amber-500/10 hover:border-amber-500/30`}
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit
        </button>
        <button
          onClick={() => setShowComment(!showComment)}
          className={`${buttonBase} border-white/10 text-gray-400 hover:bg-blue-500/10 hover:border-blue-500/30`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {showComment ? 'Hide' : 'Comment'}
        </button>
      </div>

      {showComment && (
        <div className="flex items-start gap-2">
          <input
            type="text"
            placeholder="Add a review comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
          />
          {comment && (
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20">
              Send
            </button>
          )}
        </div>
      )}

      {decision && decision !== 'pending' && (
        <div className={`text-xs ${
          decision === 'accepted' ? 'text-emerald-400' :
          decision === 'rejected' ? 'text-red-400' : 'text-amber-400'
        }`}>
          {decision === 'accepted' ? '✓ Accepted' :
           decision === 'rejected' ? '✗ Rejected' : '✎ Edited'}
        </div>
      )}
    </div>
  )
}
