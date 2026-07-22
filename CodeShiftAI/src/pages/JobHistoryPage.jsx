import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, CheckCircle2, Loader2, AlertCircle, XCircle } from 'lucide-react'
import { getJobs } from '../mock/migrations.js'
import FilterBar from '../components/FilterBar.jsx'
import JobTable from '../components/JobTable.jsx'
import JobDetailDrawer from '../components/JobDetailDrawer.jsx'

const statusConfig = {
  'queued': { icon: Clock, color: 'text-gray-400', label: 'Queued' },
  'running': { icon: Loader2, color: 'text-blue-400', label: 'Running' },
  'awaiting-review': { icon: AlertCircle, color: 'text-amber-400', label: 'Awaiting Review' },
  'completed': { icon: CheckCircle2, color: 'text-emerald-400', label: 'Completed' },
  'failed': { icon: XCircle, color: 'text-red-400', label: 'Failed' },
  'validation-timeout': { icon: AlertCircle, color: 'text-orange-400', label: 'Validation Timeout' },
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
    setFilteredJobs(result)
  }, [filters, jobs])

  function openDetail(job) {
    setSelectedJob(job)
    setDrawerOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-3">
          <span className="text-xs font-medium text-purple-400">History</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Job History</h1>
        <p className="text-sm text-gray-400 mt-1">View and manage all past migration jobs</p>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
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
            <div className="text-center py-16 text-gray-500">
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
    </div>
  )
}
