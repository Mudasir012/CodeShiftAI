import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, XCircle, FileCode } from 'lucide-react'
import { diffFiles } from '../mock/diff-data.js'
import { submitReview } from '../mock/migrations.js'
import FileTreePanel from '../components/FileTreePanel.jsx'
import DiffViewer from '../components/DiffViewer.jsx'
import HunkControls from '../components/HunkControls.jsx'
import FinalizeBar from '../components/FinalizeBar.jsx'

export default function DiffReviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [files] = useState(diffFiles)
  const [selectedFile, setSelectedFile] = useState(diffFiles[0])
  const [decisions, setDecisions] = useState({})
  const [finalizing, setFinalizing] = useState(false)
  const [exported, setExported] = useState(false)

  useEffect(() => {
    const initial = {}
    files.forEach(f =>
      f.hunks.forEach(h => { initial[h.id] = h.decision })
    )
    setDecisions(initial)
  }, [files])

  function handleDecision(hunkId, decision) {
    setDecisions(prev => ({ ...prev, [hunkId]: decision }))
  }

  function getFileStatus(file) {
    const fileDecisions = file.hunks.map(h => decisions[h.id])
    const allAccepted = fileDecisions.every(d => d === 'accepted')
    const allRejected = fileDecisions.every(d => d === 'rejected')
    const anyPending = fileDecisions.some(d => d === 'pending' || !d)

    if (allAccepted) return { label: 'Accepted', icon: CheckCircle2, color: 'text-emerald-400' }
    if (allRejected) return { label: 'Rejected', icon: XCircle, color: 'text-red-400' }
    if (anyPending) return { label: 'Pending Review', icon: AlertCircle, color: 'text-amber-400' }
    return { label: 'Partial', icon: AlertCircle, color: 'text-amber-400' }
  }

  const totalHunks = files.reduce((sum, f) => sum + f.hunks.length, 0)
  const reviewedHunks = Object.values(decisions).filter(d => d !== 'pending').length
  const allReviewed = reviewedHunks === totalHunks
  const anyAccepted = Object.values(decisions).some(d => d === 'accepted')

  async function handleFinalize() {
    setFinalizing(true)
    await new Promise(r => setTimeout(r, 1500))
    await submitReview(id, decisions)
    setFinalizing(false)
    setExported(true)
  }

  if (exported) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Migration Exported</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-md">
            All accepted changes have been pushed to the branch{' '}
            <code className="px-1.5 py-0.5 glass rounded text-xs font-mono text-purple-300">codeshift-migrated</code>
            {' '}on the original repository.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/migrations/${id}`)} className="p-1.5 glass rounded-lg hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">Review Migration Changes</h1>
            <p className="text-xs text-gray-500">
              {reviewedHunks} of {totalHunks} hunks reviewed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            allReviewed ? 'glass text-emerald-400 border border-emerald-500/20' : 'glass text-amber-400 border border-amber-500/20'
          }`}>
            {allReviewed ? 'All hunks reviewed' : `${totalHunks - reviewedHunks} hunks remaining`}
          </span>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="w-64 flex-shrink-0 overflow-y-auto">
          <FileTreePanel
            files={files}
            selectedPath={selectedFile?.path}
            onSelect={setSelectedFile}
            getFileStatus={getFileStatus}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {selectedFile && (
            <>
              <div className="glass-card rounded-t-2xl px-4 py-2.5 flex items-center justify-between flex-shrink-0 border-b-0">
                <div className="flex items-center gap-2 text-sm">
                  <FileCode className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-gray-300">{selectedFile.path}</span>
                  <span className={`px-1.5 py-0.5 rounded-lg text-xs font-medium ${
                    selectedFile.status === 'validated' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    selectedFile.status === 'test-failure' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {selectedFile.status === 'validated' ? 'Validated' :
                     selectedFile.status === 'test-failure' ? 'Test Failure' :
                     'Needs Review'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      selectedFile.hunks.forEach(h => handleDecision(h.id, 'accepted'))
                    }}
                    className="px-2 py-1 text-xs text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => {
                      selectedFile.hunks.forEach(h => handleDecision(h.id, 'rejected'))
                    }}
                    className="px-2 py-1 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Reject All
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto glass-card rounded-b-2xl rounded-t-none">
                {selectedFile.hunks.map((hunk) => (
                  <div key={hunk.id} className="border-b border-white/5 last:border-b-0">
                    <div className="px-4 py-1.5 bg-white/5 text-xs font-mono text-gray-500 border-b border-white/5">
                      {hunk.header}
                    </div>
                    <DiffViewer original={hunk.original} migrated={hunk.migrated} />
                    <div className="px-4 py-2">
                      <HunkControls
                        hunkId={hunk.id}
                        decision={decisions[hunk.id]}
                        onDecision={handleDecision}
                        original={hunk.original}
                        migrated={hunk.migrated}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <FinalizeBar
        allReviewed={allReviewed}
        anyAccepted={anyAccepted}
        totalHunks={totalHunks}
        reviewedHunks={reviewedHunks}
        decisions={decisions}
        onFinalize={handleFinalize}
        finalizing={finalizing}
      />
    </div>
  )
}
