import { useState } from 'react'
import { Check, X, Edit3, MessageSquare, Save } from 'lucide-react'

export default function HunkControls({ hunkId, decision, onDecision, original, migrated }) {
  const [editing, setEditing] = useState(false)
  const [editedCode, setEditedCode] = useState(migrated)
  const [comment, setComment] = useState('')
  const [showComment, setShowComment] = useState(false)

  function handleSaveEdit() {
    onDecision(hunkId, 'edited')
    setEditing(false)
  }

  const buttonBase = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors'

  if (editing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editedCode}
          onChange={e => setEditedCode(e.target.value)}
          className="w-full h-32 font-mono text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
        <div className="flex items-center gap-2">
          <button onClick={handleSaveEdit} className={`${buttonBase} bg-violet-600 text-white border-violet-600 hover:bg-violet-700`}>
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={() => setEditing(false)} className={`${buttonBase} border-gray-200 text-gray-600 hover:bg-gray-50`}>
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
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-300'
          }`}
        >
          <Check className="w-3.5 h-3.5" /> Accept
        </button>
        <button
          onClick={() => onDecision(hunkId, 'rejected')}
          className={`${buttonBase} ${
            decision === 'rejected'
              ? 'bg-red-50 border-red-300 text-red-700'
              : 'border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300'
          }`}
        >
          <X className="w-3.5 h-3.5" /> Reject
        </button>
        <button
          onClick={() => { setEditedCode(migrated); setEditing(true) }}
          className={`${buttonBase} border-gray-200 text-gray-600 hover:bg-amber-50 hover:border-amber-300`}
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit
        </button>
        <button
          onClick={() => setShowComment(!showComment)}
          className={`${buttonBase} border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300`}
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
            className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {comment && (
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700">
              Send
            </button>
          )}
        </div>
      )}

      {decision && decision !== 'pending' && (
        <div className={`text-xs ${
          decision === 'accepted' ? 'text-emerald-600' :
          decision === 'rejected' ? 'text-red-600' : 'text-amber-600'
        }`}>
          {decision === 'accepted' ? '✓ Accepted' :
           decision === 'rejected' ? '✗ Rejected' : '✎ Edited'}
        </div>
      )}
    </div>
  )
}
