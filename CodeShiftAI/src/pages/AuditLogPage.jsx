import { useState, useEffect } from 'react'
import { Search, Shield, AlertTriangle, Info, AlertCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { getAuditLog } from '../mock/audit-log.js'
import PageContainer from '../components/PageContainer.jsx'
import PageHeader from '../components/PageHeader.jsx'

const severityConfig = {
  INFO: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  WARNING: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-500' },
  CRITICAL: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' },
}

const severityOptions = [
  { value: 'all', label: 'All Severities' },
  { value: 'INFO', label: 'Info' },
  { value: 'WARNING', label: 'Warning' },
  { value: 'CRITICAL', label: 'Critical' },
]

export default function AuditLogPage() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    setLoading(true)
    getAuditLog({ status: severity, search, page, pageSize: 15 }).then(({ items, totalPages: tp }) => {
      setEntries(items)
      setTotalPages(tp)
      setLoading(false)
    })
  }, [severity, search, page])

  const toggleExpanded = (id) => {
    setExpanded(prev => prev === id ? null : id)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Audit Log"
        description="Security-relevant events, pipeline diagnostics, and compliance trail"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by action, user, or detail..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <select
          value={severity}
          onChange={e => { setSeverity(e.target.value); setPage(1) }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          {severityOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {entries.length} of {totalPages * 15}+ entries
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map(entry => {
            const config = severityConfig[entry.severity] || severityConfig.INFO
            const Icon = config.icon
            const isExpanded = expanded === entry.id
            return (
              <div key={entry.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleExpanded(entry.id)}
                  className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${config.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                        {entry.severity}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{entry.action}</span>
                      {entry.jobId && (
                        <span className="text-xs text-gray-400 font-mono">{entry.jobId}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{entry.detail}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-3 pt-1 border-t border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-400">User</span>
                        <p className="font-medium text-gray-700">{entry.user}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Timestamp</span>
                        <p className="font-medium text-gray-700">{new Date(entry.timestamp).toLocaleString()}</p>
                      </div>
                      {entry.jobId && (
                        <div>
                          <span className="text-gray-400">Job ID</span>
                          <p className="font-mono text-gray-700">{entry.jobId}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-400">Event ID</span>
                        <p className="font-mono text-gray-700">{entry.id}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          {entries.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No audit entries match your filters</p>
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </PageContainer>
  )
}
