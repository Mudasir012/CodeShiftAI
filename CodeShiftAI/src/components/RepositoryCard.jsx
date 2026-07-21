import { GitBranch, Code2, ArrowRight } from 'lucide-react'

const providerColors = {
  github: { bg: 'bg-gray-900', hover: 'hover:bg-black', label: 'GitHub' },
  gitlab: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', label: 'GitLab' },
  bitbucket: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', label: 'Bitbucket' },
}

export default function RepositoryCard({ repo, ProviderIcon, formatDate, onMigrate }) {
  const colors = providerColors[repo.provider] || providerColors.github

  return (
    <div className="bg-white border-2 border-black hover:bg-gray-50 transition-colors relative">
      {repo.lastMigration && (
        <div className="absolute -top-2.5 -right-2.5 border-2 border-black bg-lime-400 text-black px-2 py-0.5 text-[10px] font-bold uppercase rotate-2">
          Migrated
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className={`${colors.bg} p-2 border-2 border-black ${colors.hover} transition-colors relative`}>
            <ProviderIcon className="w-5 h-5 text-white" />
            <div className="absolute -bottom-1.5 -right-1.5 bg-white border border-black px-1 py-0.5 text-[8px] font-bold uppercase leading-none">
              {repo.provider === 'github' ? 'GH' : repo.provider === 'gitlab' ? 'GL' : 'BB'}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-black truncate text-base uppercase">{repo.name}</h3>
            <p className="text-xs text-gray-500 truncate font-mono">{repo.fullName}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{repo.description}</p>

        <div className="border-t-2 border-black pt-3 mb-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-bold uppercase">
            <span className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              {repo.language} {repo.sourceVersion}
            </span>
            <span className="flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              {repo.defaultBranch}
            </span>
            <span className="text-[10px] text-gray-400">
              Last: {formatDate(repo.lastMigration)}
            </span>
          </div>
        </div>

        <button
          onClick={onMigrate}
          className="w-full px-3 py-2.5 text-sm font-bold text-black border-2 border-black hover:bg-black hover:text-lime-400 transition-colors uppercase flex items-center justify-between group"
        >
          <span>Start Migration</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
