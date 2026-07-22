import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Terminal, ArrowRight } from 'lucide-react'
import { GithubIcon, GitlabIcon, BitbucketIcon } from '../components/BrandIcons.jsx'

const providers = [
  { id: 'github', name: 'GitHub', icon: GithubIcon, color: 'bg-gray-900 hover:bg-gray-800' },
  { id: 'gitlab', name: 'GitLab', icon: GitlabIcon, color: 'bg-orange-600 hover:bg-orange-500' },
  { id: 'bitbucket', name: 'Bitbucket', icon: BitbucketIcon, color: 'bg-blue-600 hover:bg-blue-500' },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const [connecting, setConnecting] = useState(null)

  function handleConnect(providerId) {
    setConnecting(providerId)
    setTimeout(() => {
      setConnecting(null)
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-2xl mb-4 shadow-lg">
            <Terminal className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">CodeShift AI</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to start migrating your codebases</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Connect your Git provider</h2>
          <div className="space-y-3">
            {providers.map(provider => {
              const Icon = provider.icon
              const isLoading = connecting === provider.id
              return (
                <button
                  key={provider.id}
                  onClick={() => handleConnect(provider.id)}
                  disabled={connecting !== null}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white text-sm font-medium transition-all ${provider.color} ${
                    connecting !== null && !isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">
                    {isLoading ? 'Connecting...' : `Continue with ${provider.name}`}
                  </span>
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4 opacity-60" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              By connecting, you authorize CodeShift AI to access your repositories.
              <br />
              Your code is encrypted and never used for training.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          CodeShift AI v1.0 &mdash; CS-413 SP24-BCS-5C
        </p>
      </div>
    </div>
  )
}
