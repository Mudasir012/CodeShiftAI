import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Code2, HardDrive, GitFork, Activity } from 'lucide-react'
import { GithubIcon, GitlabIcon, BitbucketIcon } from '../components/BrandIcons.jsx'
import { useApp } from '../context/AppContext.jsx'
import { repositories } from '../mock/repositories.js'
import RepositoryCard from '../components/RepositoryCard.jsx'
import PageContainer from '../components/PageContainer.jsx'
import PageHeader from '../components/PageHeader.jsx'

const providerIcons = { github: GithubIcon, gitlab: GitlabIcon, bitbucket: BitbucketIcon }

function formatDate(dateStr) {
  if (!dateStr) return 'Never'
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now - d
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return d.toLocaleDateString()
}

export default function DashboardPage() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'SET_REPOSITORIES', payload: repositories })
  }, [dispatch])

  const repos = state.repositories
  const connectedCount = repos.length
  const providerCount = new Set(repos.map(r => r.provider)).size
  const migratedCount = repos.filter(r => r.lastMigration).length
  const lastActive = repos.reduce((latest, r) => {
    return r.lastMigration && (!latest || r.lastMigration > latest) ? r.lastMigration : latest
  }, null)

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Connect a repository to start a code migration"
        action={
          <button
            onClick={() => navigate('/connect')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Connect Repository
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: HardDrive, label: 'Repositories', value: connectedCount },
          { icon: GitFork, label: 'Providers', value: providerCount },
          { icon: Activity, label: 'Migrated', value: migratedCount },
          { icon: Activity, label: 'Last Activity', value: lastActive ? formatDate(lastActive) : 'N/A' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {repos.map((repo) => {
          const ProviderIcon = providerIcons[repo.provider] || Code2
          return (
            <RepositoryCard
              key={repo.id}
              repo={repo}
              ProviderIcon={ProviderIcon}
              formatDate={formatDate}
              onMigrate={() => navigate(`/connect?repo=${repo.id}`)}
            />
          )
        })}
      </div>
    </PageContainer>
  )
}
