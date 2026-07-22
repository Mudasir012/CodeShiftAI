import { useEffect, useState } from 'react'
import { X, Eye, ArrowRight } from 'lucide-react'
import { getAuditLogForJob } from '../mock/migrations.js'

const statusStyleMap = {
  'queued': 'bg-gray-500/10 border-gray-500/20 text-gray-400',
  'running': 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'awaiting-review': 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  'completed': 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  'failed': 'bg-red-500/10 border-red-500/20 text-red-400',
  'validation-timeout': 'bg-orange-500/10 border-orange-500/20 text-orange-400',
}

export default function JobDetailDrawer({ job, statusConfig, onClose, onNavigate }) {
  const [auditLog, setAuditLog] = useState([])
  const config = statusConfig[job.status] || statusConfig['queued']
  const Icon = config.icon
  const statusStyle = statusStyleMap[job.status] || statusStyleMap['queued']

  useEffect(() => {
    getAuditLogForJob(job.id).then(setAuditLog)
  }, [job.id])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#0f0f17] border-l border-white/5 shadow-2xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-[#0f0f17] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Job Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">{job.repoName}</h3>
              <p className="text-xs text-gray-500 font-mono mt-0.5">{job.id}</p>
            </div>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle}`}>
              <Icon className={`w-3.5 h-3.5 ${job.status === 'running' ? 'animate-spin' : ''}`} />
              {config.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 text-xs">Requested By</span>
              <p className="font-medium text-gray-200">{job.createdBy}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Duration</span>
              <p className="font-medium text-gray-200">{job.duration || 'In progress'}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Created</span>
              <p className="font-medium text-gray-200">{new Date(job.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Completed</span>
              <p className="font-medium text-gray-200">{job.completedAt ? new Date(job.completedAt).toLocaleString() : '-'}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500 text-xs">Migration Path</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400 text-xs font-medium">{job.sourceVersion}</span>
                <ArrowRight className="w-3 h-3 text-gray-600" />
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-xs font-medium">{job.targetVersion}</span>
              </div>
            </div>
          </div>

          {job.status === 'awaiting-review' && (
            <button
              onClick={() => onNavigate(`${job.id}/review`)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
            >
              <Eye className="w-4 h-4" />
              Review Changes
            </button>
          )}

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Audit Trail ({auditLog.length} entries)
            </h4>
            <div className="space-y-1">
              {auditLog.map(entry => (
                <div key={entry.id} className="flex items-start gap-2 px-3 py-2 bg-white/5 rounded-xl text-xs">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    entry.severity === 'CRITICAL' ? 'bg-red-500' :
                    entry.severity === 'WARNING' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-300">{entry.action}</span>
                      <span className="text-gray-500">{entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : ''}</span>
                    </div>
                    <p className="text-gray-500 mt-0.5">{entry.detail}</p>
                  </div>
                </div>
              ))}
              {auditLog.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-4">No audit entries for this job</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
