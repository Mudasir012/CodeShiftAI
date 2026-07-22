import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, CheckCircle, Loader2, AlertCircle, XCircle, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { getJobs } from '../mock/migrations.js'

const statusIcons = {
  'queued': Clock,
  'running': Loader2,
  'awaiting-review': AlertCircle,
  'completed': CheckCircle,
  'failed': XCircle,
  'validation-timeout': AlertCircle,
}

const statusColors = {
  'queued': 'text-gray-400',
  'running': 'text-blue-600',
  'awaiting-review': 'text-amber-600',
  'completed': 'text-emerald-600',
  'failed': 'text-red-600',
  'validation-timeout': 'text-orange-600',
}

const statusLabels = {
  'queued': 'Queued',
  'running': 'Running',
  'awaiting-review': 'Awaiting Review',
  'completed': 'Completed',
  'failed': 'Failed',
  'validation-timeout': 'Validation Timeout',
}

const groupOrder = ['running', 'queued', 'awaiting-review', 'completed', 'failed', 'validation-timeout']

export default function Sidebar() {
  const { state, dispatch } = useApp()
  const location = useLocation()

  useEffect(() => {
    getJobs().then(jobs => dispatch({ type: 'SET_JOBS', payload: jobs }))
  }, [dispatch])

  const grouped = {}
  state.jobs.forEach(job => {
    if (!grouped[job.status]) grouped[job.status] = []
    grouped[job.status].push(job)
  })

  return (
    <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Jobs</h2>
      </div>

      {state.jobs.length === 0 ? (
        <div className="p-4 text-sm text-gray-400 text-center">No migration jobs yet</div>
      ) : (
        <div className="p-3 space-y-4">
          {groupOrder.map(status => {
            const jobs = grouped[status]
            if (!jobs || jobs.length === 0) return null
            const Icon = statusIcons[status]
            const color = statusColors[status]

            return (
              <div key={status}>
                <div className={`flex items-center gap-1.5 px-2 py-1 text-xs font-semibold ${color}`}>
                  <Icon className={`w-3.5 h-3.5 ${status === 'running' ? 'animate-spin' : ''}`} />
                  {statusLabels[status]}
                  <span className="ml-auto">{jobs.length}</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {jobs.slice(0, 3).map(job => (
                    <Link
                      key={job.id}
                      to={`/migrations/${job.id}`}
                      className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors ${
                        location.pathname.includes(job.id)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate max-w-[160px] font-medium">{job.repoName}</span>
                      <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-300" />
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="p-4 border-t border-gray-100">
        <Link
          to="/history"
          className="block w-full text-center px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          View all jobs &rarr;
        </Link>
      </div>
    </aside>
  )
}
