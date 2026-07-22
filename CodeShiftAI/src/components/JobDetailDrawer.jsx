import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Clock, CheckCircle2, Loader2, AlertCircle, XCircle, ArrowRight, Eye, FileCode } from 'lucide-react'
import { getAuditLogForJob } from '../mock/migrations.js'

export default function JobDetailDrawer({ job, statusConfig, onClose, onNavigate }) {
  const [auditLog, setAuditLog] = useState([])
  const navigate = useNavigate()
  const config = statusConfig[job.status] || statusConfig['queued']
  const Icon = config.icon

  useEffect(() => {
    getAuditLogForJob(job.id).then(setAuditLog)
  }, [job.id])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Job Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">{job.repoName}</h3>
              <p className="text-xs text-gray-500 font-mono mt-0.5">{job.id}</p>
            </div>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
              <Icon className={`w-3.5 h-3.5 ${job.status === 'running' ? 'animate-spin' : ''}`} />
              {config.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400 text-xs">Requested By</span>
              <p className="font-medium">{job.createdBy}</p>
            </div>
            <div>
              <span className="text-gray-400 text-xs">Duration</span>
              <p className="font-medium">{job.duration || 'In progress'}</p>
            </div>
            <div>
              <span className="text-gray-400 text-xs">Created</span>
              <p className="font-medium">{new Date(job.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-400 text-xs">Completed</span>
              <p className="font-medium">{job.completedAt ? new Date(job.completedAt).toLocaleString() : '-'}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-400 text-xs">Migration Path</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-xs font-medium">{job.sourceVersion}</span>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">{job.targetVersion}</span>
              </div>
            </div>
          </div>

          {job.status === 'awaiting-review' && (
            <button
              onClick={() => onNavigate(`${job.id}/review`)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Review Changes
            </button>
          )}

          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Audit Trail ({auditLog.length} entries)
            </h4>
            <div className="space-y-1">
              {auditLog.map(entry => (
                <div key={entry.id} className="flex items-start gap-2 px-3 py-2 bg-gray-50 rounded-lg text-xs">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    entry.severity === 'CRITICAL' ? 'bg-red-500' :
                    entry.severity === 'WARNING' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">{entry.action}</span>
                      <span className="text-gray-400">{entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : ''}</span>
                    </div>
                    <p className="text-gray-500 mt-0.5">{entry.detail}</p>
                  </div>
                </div>
              ))}
              {auditLog.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">No audit entries for this job</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
