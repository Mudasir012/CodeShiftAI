import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Search, FolderGit2 } from 'lucide-react'
import { GithubIcon, GitlabIcon, BitbucketIcon } from '../components/BrandIcons.jsx'
import { repositories, migrationPairs, providers } from '../mock/repositories.js'
import { createJob } from '../mock/migrations.js'
import { useApp } from '../context/AppContext.jsx'
import PageContainer from '../components/PageContainer.jsx'

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
    <PageContainer maxWidth="max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900">New Migration</h2>
            <span className="text-xs text-gray-400 font-medium">Step {step} of 3</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-violet-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Select Git Provider</h3>
            <div className="grid grid-cols-3 gap-3">
              {providers.map(p => {
                const Icon = providerIcons[p.id]
                const isSelected = selectedProvider === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProvider(p.id); setStep(2) }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-8 h-8 text-gray-700" />
                    <span className="text-sm font-medium">{p.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Select Repository</h3>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors"
              >
                Change provider
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-1 max-h-64 overflow-y-auto">
              {filteredRepos.map(repo => (
                <button
                  key={repo.id}
                  onClick={() => { setSelectedRepo(repo); setSelectedBranch(repo.defaultBranch) }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedRepo?.id === repo.id
                      ? 'bg-violet-50 border border-violet-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate font-medium">{repo.name}</span>
                    <span className="text-xs text-gray-400 truncate">{repo.language}</span>
                  </div>
                  {selectedRepo?.id === repo.id && (
                    <Check className="w-4 h-4 text-violet-600 flex-shrink-0" />
                  )}
                </button>
              ))}
              {filteredRepos.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No repositories found</p>
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
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                        selectedBranch === b
                          ? 'border-violet-500 bg-violet-50 text-violet-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
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
                className="flex items-center gap-1 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Migration Target</h3>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FolderGit2 className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{selectedRepo?.name}</span>
                <span className="text-gray-400">({selectedBranch})</span>
              </div>
            </div>

            <div className="space-y-2">
              {compatiblePairs.map(pair => (
                <button
                  key={pair.id}
                  onClick={() => setMigrationTarget(pair.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-colors ${
                    migrationTarget === pair.id
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">{pair.source}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-xs font-medium">{pair.target}</span>
                  </div>
                  {migrationTarget === pair.id && <Check className="w-4 h-4 text-violet-600" />}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleCreate}
                disabled={!migrationTarget || creating}
                className="flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {creating ? 'Starting...' : 'Start Migration'}
                {!creating && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
