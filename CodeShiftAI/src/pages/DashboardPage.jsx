import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Code2, HardDrive, GitFork, Activity } from 'lucide-react'
import { GithubIcon, GitlabIcon, BitbucketIcon } from '../components/BrandIcons.jsx'
import { useApp } from '../context/AppContext.jsx'
import { repositories } from '../mock/repositories.js'
import RepositoryCard from '../components/RepositoryCard.jsx'

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

const statIcons = [HardDrive, GitFork, Activity, Activity]

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

  const stats = [
    { label: 'Repositories', value: connectedCount },
    { label: 'Providers', value: providerCount },
    { label: 'Migrated', value: migratedCount },
    { label: 'Last Activity', value: lastActive ? formatDate(lastActive) : 'N/A' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-3">
            <span className="text-xs font-medium text-purple-400">Dashboard</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Repositories</h1>
          <p className="text-sm text-gray-400 mt-1">Connect a repository to start a code migration</p>
        </div>
        <button
          onClick={() => navigate('/connect')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
        >
          <Plus className="w-4 h-4" />
          Connect Repository
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map((stat, i) => {
          const Icon = statIcons[i]
          return (
            <div key={stat.label} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/10 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-xs font-medium text-gray-500">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
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
    </div>
  )
}
