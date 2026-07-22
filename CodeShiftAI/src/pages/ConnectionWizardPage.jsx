import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Search, FolderGit2 } from 'lucide-react'
import { GithubIcon, GitlabIcon, BitbucketIcon } from '../components/BrandIcons.jsx'
import { repositories, migrationPairs, providers } from '../mock/repositories.js'
import { createJob } from '../mock/migrations.js'
import { useApp } from '../context/AppContext.jsx'

const providerIcons = { github: GithubIcon, gitlab: GitlabIcon, bitbucket: BitbucketIcon }

export default function ConnectionWizardPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { dispatch } = useApp()

  const [step, setStep] = useState(1)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [selectedBranch, setSelectedBranch] = useState('main')
  const [search, setSearch] = useState('')
  const [migrationTarget, setMigrationTarget] = useState('')
  const [creating, setCreating] = useState(false)

  const filteredRepos = repositories.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.fullName.toLowerCase().includes(search.toLowerCase())
  )

  const preSelectedRepoId = searchParams.get('repo')
  if (preSelectedRepoId && !selectedRepo && step === 1) {
    const repo = repositories.find(r => r.id === preSelectedRepoId)
    if (repo) {
      setSelectedProvider(repo.provider)
      setSelectedRepo(repo)
      setSelectedBranch(repo.defaultBranch)
      setStep(2)
    }
  }

  const compatiblePairs = selectedRepo
    ? migrationPairs.filter(p => p.source.toLowerCase().includes(selectedRepo.sourceVersion.toLowerCase()) || selectedRepo.language.toLowerCase().includes(p.source.split(' ')[0].toLowerCase()))
    : migrationPairs

  async function handleCreate() {
    if (!selectedRepo || !migrationTarget) return
    setCreating(true)
    const pair = migrationPairs.find(p => p.id === migrationTarget)
    const job = await createJob({
      repoId: selectedRepo.id,
      repoName: selectedRepo.name,
      branch: selectedBranch,
      sourceVersion: pair.source,
      targetVersion: pair.target,
    })
    dispatch({ type: 'ADD_JOB', payload: job })
    setCreating(false)
    navigate(`/migrations/${job.id}`)
  }

  const progress = (step / 3) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white">New Migration</h2>
            <span className="text-xs text-gray-500">Step {step} of 3</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {step === 1 && (
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Select Git Provider</h3>
            <div className="grid grid-cols-3 gap-3">
              {providers.map(p => {
                const Icon = providerIcons[p.id]
                const isSelected = selectedProvider === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProvider(p.id); setStep(2) }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-purple-500/50 bg-purple-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <Icon className="w-8 h-8 text-gray-300" />
                    <span className="text-sm font-medium text-gray-300">{p.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">Select Repository</h3>
              <button onClick={() => setStep(1)} className="text-xs text-purple-400 hover:text-purple-300">Change provider</button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
              />
            </div>

            <div className="space-y-1 max-h-64 overflow-y-auto">
              {filteredRepos.map(repo => (
                <button
                  key={repo.id}
                  onClick={() => { setSelectedRepo(repo); setSelectedBranch(repo.defaultBranch) }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                    selectedRepo?.id === repo.id
                      ? 'bg-purple-500/10 border border-purple-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate font-medium text-gray-200">{repo.name}</span>
                    <span className="text-xs text-gray-500 truncate">{repo.language}</span>
                  </div>
                  {selectedRepo?.id === repo.id && <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                </button>
              ))}
              {filteredRepos.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No repositories found</p>
              )}
            </div>

            {selectedRepo && (
              <div className="mt-4">
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Branch</label>
                <div className="flex gap-2">
                  {['main', 'master', 'develop'].map(b => (
                    <button
                      key={b}
                      onClick={() => setSelectedBranch(b)}
                      className={`px-3 py-1.5 text-sm rounded-xl border transition-colors ${
                        selectedBranch === b
                          ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                          : 'border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep(3)}
                disabled={!selectedRepo}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Migration Target</h3>

            <div className="glass rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FolderGit2 className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-200">{selectedRepo?.name}</span>
                <span className="text-gray-500">({selectedBranch})</span>
              </div>
            </div>

            <div className="space-y-2">
              {compatiblePairs.map(pair => (
                <button
                  key={pair.id}
                  onClick={() => setMigrationTarget(pair.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                    migrationTarget === pair.id
                      ? 'border-purple-500/50 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400 text-xs font-medium">{pair.source}</span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-xs font-medium">{pair.target}</span>
                  </div>
                  {migrationTarget === pair.id && <Check className="w-4 h-4 text-purple-400" />}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleCreate}
                disabled={!migrationTarget || creating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25"
              >
                {creating ? 'Starting...' : 'Start Migration'}
                {!creating && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
