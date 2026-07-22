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
