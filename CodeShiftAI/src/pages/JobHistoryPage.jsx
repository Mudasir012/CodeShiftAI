import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Clock, CheckCircle2, Loader2, AlertCircle, XCircle, ArrowRight, CalendarDays } from 'lucide-react'
import { getJobs } from '../mock/migrations.js'
import FilterBar from '../components/FilterBar.jsx'
import JobTable from '../components/JobTable.jsx'
import JobDetailDrawer from '../components/JobDetailDrawer.jsx'
import PageContainer from '../components/PageContainer.jsx'
import PageHeader from '../components/PageHeader.jsx'

const statusConfig = {
  'queued': { icon: Clock, color: 'text-gray-400', bg: 'bg-gray-50', label: 'Queued' },
  'running': { icon: Loader2, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Running' },
  'awaiting-review': { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Awaiting Review' },
  'completed': { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Completed' },
  'failed': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Failed' },
  'validation-timeout': { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Validation Timeout' },
}

export default function JobHistoryPage() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ status: 'all', search: '', dateRange: 'all' })

  useEffect(() => {
    getJobs().then(data => {
      setJobs(data)
      setFilteredJobs(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    let result = [...jobs]
    if (filters.status !== 'all') {
      result = result.filter(j => j.status === filters.status)
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(j =>
        j.repoName.toLowerCase().includes(q) ||
        j.createdBy.toLowerCase().includes(q) ||
        j.id.toLowerCase().includes(q)
      )
    }
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date()
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      result = result.filter(j => {
        if (!j.createdAt) return false
        const jobDate = new Date(j.createdAt)
        const startOfJobDate = new Date(jobDate.getFullYear(), jobDate.getMonth(), jobDate.getDate())
        const diffDays = Math.round((startOfToday - startOfJobDate) / (1000 * 60 * 60 * 24))
        if (filters.dateRange === 'today') return diffDays === 0
        if (filters.dateRange === 'yesterday') return diffDays === 1
        if (filters.dateRange === 'week') return diffDays <= 7
        if (filters.dateRange === 'month') return diffDays <= 30
        return true
      })
    }
    setFilteredJobs(result)
  }, [filters, jobs])

  function openDetail(job) {
    setSelectedJob(job)
    setDrawerOpen(true)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Job History"
        description="View and manage all past migration jobs"
      />

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs text-gray-500 font-medium mr-1">Quick Filters:</span>
        <button
          onClick={() => setFilters({ status: 'all', search: '', dateRange: 'all' })}
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
            filters.dateRange === 'all' && filters.status === 'all'
              ? 'bg-violet-100 text-violet-700 border border-violet-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          All Jobs
        </button>
        <button
          onClick={() => setFilters(prev => ({ ...prev, dateRange: 'yesterday' }))}
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors flex items-center gap-1 ${
            filters.dateRange === 'yesterday'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200'
          }`}
        >
          <CalendarDays className="w-3 h-3" />
          Yesterday's Activity
        </button>
        <button
          onClick={() => setFilters(prev => ({ ...prev, status: 'awaiting-review' }))}
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
            filters.status === 'awaiting-review'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          Awaiting Review
        </button>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
        </div>
      ) : (
        <>
          <JobTable
            jobs={filteredJobs}
            statusConfig={statusConfig}
            onSelect={openDetail}
            onNavigate={(id) => navigate(`/migrations/${id}`)}
          />

          {filteredJobs.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-sm">No jobs match your filters</p>
            </div>
          )}
        </>
      )}

      {drawerOpen && selectedJob && (
        <JobDetailDrawer
          job={selectedJob}
          statusConfig={statusConfig}
          onClose={() => setDrawerOpen(false)}
          onNavigate={(id) => { setDrawerOpen(false); navigate(`/migrations/${id}`) }}
        />
      )}
    </PageContainer>
  )
}
