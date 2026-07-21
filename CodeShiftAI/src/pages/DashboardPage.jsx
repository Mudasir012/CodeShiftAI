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
    <div>
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-4">
          <div className="inline-block border-2 border-fuchsia-400 bg-fuchsia-400 text-black px-3 py-1 text-xs font-bold -rotate-1">
            DASHBOARD
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black uppercase tracking-tight">Repositories</h1>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide">Connect a repository to start a code migration</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/connect')}
          className="flex items-center gap-2 px-4 py-2 bg-lime-400 text-black font-bold border-2 border-black hover:bg-lime-500 text-sm uppercase group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          Connect Repository
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: HardDrive, label: 'Repositories', value: connectedCount },
          { icon: GitFork, label: 'Providers', value: providerCount },
          { icon: Activity, label: 'Migrated', value: migratedCount },
          { icon: Activity, label: 'Last Activity', value: lastActive ? formatDate(lastActive) : 'N/A' },
        ].map((stat, i) => {
          const rotations = ['', '-rotate-1', 'rotate-1', '']
          const Icon = stat.icon
          return (
            <div key={stat.label} className={`border-2 border-black p-4 bg-white ${rotations[i]}`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-black">{stat.value}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {repos.map((repo, i) => {
          const ProviderIcon = providerIcons[repo.provider] || Code2
          const rotations = ['', '-rotate-1', 'rotate-1', '', '-rotate-1', 'rotate-1']
          return (
            <div key={repo.id} className={rotations[i]}>
              <RepositoryCard
                repo={repo}
                ProviderIcon={ProviderIcon}
                formatDate={formatDate}
                onMigrate={() => navigate(`/connect?repo=${repo.id}`)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
