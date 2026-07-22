import { useState } from 'react'
import { Shield, Trash2, AlertTriangle, CheckCircle2, GitBranch } from 'lucide-react'
import { GithubIcon, GitlabIcon, BitbucketIcon } from '../components/BrandIcons.jsx'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {
  const navigate = useNavigate()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const connectedProviders = [
    { id: 'github', name: 'GitHub', icon: GithubIcon, username: 'mudasir-codeshift', connected: true },
    { id: 'gitlab', name: 'GitLab', icon: GitlabIcon, username: 'mudasir-codeshift', connected: true },
    { id: 'bitbucket', name: 'Bitbucket', icon: BitbucketIcon, username: null, connected: false },
  ]

  async function handleDelete() {
    setDeleting(true)
    await new Promise(r => setTimeout(r, 2000))
    setDeleting(false)
    setDeleted(true)
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  if (deleted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Erasure Completed</h2>
          <p className="text-sm text-gray-400 mt-2">Your account and all associated data have been permanently deleted.</p>
          <p className="text-xs text-gray-500 mt-1">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-3">
          <span className="text-xs font-medium text-purple-400">Settings</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your account and workspace preferences</p>
      </div>

      <div className="glass-card rounded-2xl divide-y divide-white/5">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-purple-500/20">
              MH
            </div>
            <div>
              <h3 className="font-semibold text-white">Mudasir Hussain</h3>
              <p className="text-sm text-gray-400">mudasir@codeshift.dev</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Mudasir Hussain"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <input
                type="email"
                defaultValue="mudasir@codeshift.dev"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Workspace</label>
              <input
                type="text"
                defaultValue="CodeShift Engineering"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Role</label>
              <input
                type="text"
                defaultValue="Admin"
                disabled
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-purple-400" />
            Connected Git Providers
          </h3>
          <div className="space-y-3">
            {connectedProviders.map(p => {
              const Icon = p.icon
              return (
                <div key={p.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <Icon className={`w-5 h-5 ${p.connected ? 'text-purple-400' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">{p.name}</p>
                      {p.username && <p className="text-xs text-gray-500">{p.username}</p>}
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    p.connected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-500 border border-white/10'
                  }`}>
                    {p.connected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6">
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" />
            Data Privacy & GDPR
          </h3>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Request permanent deletion of your account and all associated source code data.
            This action is irreversible and will trigger the GDPR Article 17 (Right to Erasure) workflow.
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Request Data Erasure
            </button>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-300">Are you absolutely sure?</h4>
                  <p className="text-xs text-red-400 mt-1">
                    This will permanently delete your account, all source code, migration artifacts,
                    and personally identifiable information. This cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 transition-colors"
                >
                  {deleting ? 'Processing erasure...' : 'Confirm Erasure'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
