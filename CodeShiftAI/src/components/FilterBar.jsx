import { Search } from 'lucide-react'

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'queued', label: 'Queued' },
  { value: 'running', label: 'Running' },
  { value: 'awaiting-review', label: 'Awaiting Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'validation-timeout', label: 'Validation Timeout' },
]

const dateOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
]

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by repo, user, or job ID..."
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
        />
      </div>
      <select
        value={filters.status}
        onChange={e => onChange({ ...filters, status: e.target.value })}
        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
      >
        {statusOptions.map(o => (
          <option key={o.value} value={o.value} className="bg-[#0a0a0f]">{o.label}</option>
        ))}
      </select>
      <select
        value={filters.dateRange}
        onChange={e => onChange({ ...filters, dateRange: e.target.value })}
        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
      >
        {dateOptions.map(o => (
          <option key={o.value} value={o.value} className="bg-[#0a0a0f]">{o.label}</option>
        ))}
      </select>
    </div>
  )
}
