import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, XCircle, FileCode } from 'lucide-react'
import { diffFiles } from '../mock/diff-data.js'
import { submitReview } from '../mock/migrations.js'
import FileTreePanel from '../components/FileTreePanel.jsx'
import DiffViewer from '../components/DiffViewer.jsx'
import HunkControls from '../components/HunkControls.jsx'
import FinalizeBar from '../components/FinalizeBar.jsx'

const statusIcons = {
  'validated': { icon: CheckCircle2, color: 'text-emerald-500' },
  'needs-review': { icon: AlertCircle, color: 'text-amber-500' },
  'test-failure': { icon: XCircle, color: 'text-red-500' },
}

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

    if (allAccepted) return { label: 'Accepted', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' }
    if (allRejected) return { label: 'Rejected', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' }
    if (anyPending) return { label: 'Pending Review', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' }
    return { label: 'Partial', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' }
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
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Migration Exported</h2>
          <p className="text-sm text-gray-500 mt-2">
            All accepted changes have been pushed to the branch{' '}
            <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">codeshift-migrated</code>
            {' '}on the original repository.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate(`/migrations/${id}`)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">Review Migration Changes</h1>
              <p className="text-xs text-gray-500">
                {reviewedHunks} of {totalHunks} hunks reviewed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              allReviewed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {allReviewed ? 'All hunks reviewed' : `${totalHunks - reviewedHunks} hunks remaining`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex gap-4 h-full">
          <div className="w-64 flex-shrink-0 overflow-y-auto hidden lg:block">
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
                <div className="bg-white rounded-t-xl border border-gray-200 px-4 py-2 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2 text-sm min-w-0">
                    <FileCode className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="font-mono text-gray-700 truncate">{selectedFile.path}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                      selectedFile.status === 'validated' ? 'bg-emerald-50 text-emerald-700' :
                      selectedFile.status === 'test-failure' ? 'bg-red-50 text-red-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {selectedFile.status === 'validated' ? 'Validated' :
                       selectedFile.status === 'test-failure' ? 'Test Failure' :
                       'Needs Review'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => { selectedFile.hunks.forEach(h => handleDecision(h.id, 'accepted')) }}
                      className="px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={() => { selectedFile.hunks.forEach(h => handleDecision(h.id, 'rejected')) }}
                      className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      Reject All
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto border-x border-gray-200 bg-white">
                  {selectedFile.hunks.map((hunk) => (
                    <div key={hunk.id} className="border-b border-gray-100">
                      <div className="px-4 py-1.5 bg-gray-50 text-xs font-mono text-gray-500 border-y border-gray-100">
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
