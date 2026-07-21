import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function JobTable({ jobs, statusConfig, onSelect, onNavigate }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Job ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Repository</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Requested By</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Migration</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Start Time</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Duration</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {jobs.map(job => {
              const config = statusConfig[job.status] || statusConfig['queued']
              const Icon = config.icon
              return (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onSelect(job)}
                >
                  <td className="px-4 py-3 text-sm font-mono text-gray-500">{job.id}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{job.repoName}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{job.createdBy}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded">{job.sourceVersion}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded">{job.targetVersion}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{job.duration || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                      <Icon className={`w-3 h-3 ${job.status === 'running' ? 'animate-spin' : ''}`} />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); onNavigate(job.id) }}
                      className="p-1.5 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-400">
          No migration jobs found
        </div>
      )}
    </div>
  )
}
