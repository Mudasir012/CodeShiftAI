import { ArrowRight, ArrowUpRight } from 'lucide-react'

const statusBgColors = {
  'queued': 'bg-gray-500/10 border-gray-500/20 text-gray-400',
  'running': 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'awaiting-review': 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  'completed': 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  'failed': 'bg-red-500/10 border-red-500/20 text-red-400',
  'validation-timeout': 'bg-orange-500/10 border-orange-500/20 text-orange-400',
}

export default function JobTable({ jobs, statusConfig, onSelect, onNavigate }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Job ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Repository</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Requested By</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Migration</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {jobs.map(job => {
              const config = statusConfig[job.status] || statusConfig['queued']
              const Icon = config.icon
              const statusStyle = statusBgColors[job.status] || statusBgColors['queued']
              return (
                <tr
                  key={job.id}
                  className="hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => onSelect(job)}
                >
                  <td className="px-4 py-3 text-sm font-mono text-gray-500">{job.id}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-200">{job.repoName}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{job.createdBy}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="px-1.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400">{job.sourceVersion}</span>
                      <ArrowRight className="w-3 h-3 text-gray-600" />
                      <span className="px-1.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/15 text-emerald-400">{job.targetVersion}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{job.duration || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyle}`}>
                      <Icon className={`w-3 h-3 ${job.status === 'running' ? 'animate-spin' : ''}`} />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); onNavigate(job.id) }}
                      className="p-1.5 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
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
        <div className="text-center py-12 text-sm text-gray-500">
          No migration jobs found
        </div>
      )}
    </div>
  )
}
