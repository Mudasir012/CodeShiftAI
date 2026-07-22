import { useState } from 'react'
import { User, Shield, Trash2, AlertTriangle, CheckCircle2, GitBranch } from 'lucide-react'
import { GithubIcon, GitlabIcon, BitbucketIcon } from '../components/BrandIcons.jsx'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/PageContainer.jsx'
import PageHeader from '../components/PageHeader.jsx'

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
    setTimeout(() => { navigate('/') }, 3000)
  }

  if (deleted) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Erasure Completed</h2>
            <p className="text-sm text-gray-500 mt-2">Your account and all associated data have been permanently deleted.</p>
            <p className="text-xs text-gray-400 mt-1">Redirecting to dashboard...</p>
          </div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer maxWidth="max-w-2xl">
      <PageHeader
        title="Settings"
        description="Manage your account and workspace preferences"
      />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-lg font-bold text-violet-700 flex-shrink-0">
              MH
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900">Mudasir Hussain</h3>
              <p className="text-sm text-gray-500">mudasir@codeshift.dev</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Mudasir Hussain"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <input
                type="email"
                defaultValue="mudasir@codeshift.dev"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Workspace</label>
              <input
                type="text"
                defaultValue="CodeShift Engineering"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Role</label>
              <input
                type="text"
                defaultValue="Admin"
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-gray-500" />
            Connected Git Providers
          </h3>
          <div className="space-y-3">
            {connectedProviders.map(p => {
              const Icon = p.icon
              return (
                <div key={p.id} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${p.connected ? 'bg-gray-100' : 'bg-gray-50'}`}>
                      <Icon className={`w-5 h-5 ${p.connected ? 'text-gray-700' : 'text-gray-300'}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">{p.name}</p>
                      {p.username && <p className="text-xs text-gray-500 truncate">{p.username}</p>}
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                    p.connected ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {p.connected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mt-6 overflow-hidden">
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-500" />
            Data Privacy & GDPR
          </h3>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Request permanent deletion of your account and all associated source code data.
            This action is irreversible and will trigger the GDPR Article 17 (Right to Erasure) workflow.
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Request Data Erasure
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-800">Are you absolutely sure?</h4>
                  <p className="text-xs text-red-600 mt-1">
                    This will permanently delete your account, all source code, migration artifacts,
                    and personally identifiable information. This cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {deleting ? 'Processing erasure...' : 'Confirm Erasure'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
