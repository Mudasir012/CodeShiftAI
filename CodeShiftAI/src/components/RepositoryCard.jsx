import { GitBranch, Code2, ArrowRight } from 'lucide-react'

export default function RepositoryCard({ repo, ProviderIcon, formatDate, onMigrate }) {
  return (
    <div className="glass-card rounded-2xl p-5 group hover:-translate-y-0.5 transition-all duration-300 relative">
      {repo.lastMigration && (
        <div className="absolute -top-2.5 -right-2.5 glass rounded-full px-2.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20 bg-emerald-500/10">
          Migrated
        </div>
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/10 flex items-center justify-center flex-shrink-0">
          <ProviderIcon className="w-5 h-5 text-purple-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white truncate text-base">{repo.name}</h3>
          <p className="text-xs text-gray-500 truncate font-mono">{repo.fullName}</p>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">{repo.description}</p>

      <div className="border-t border-white/5 pt-3 mb-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            {repo.language} {repo.sourceVersion}
          </span>
          <span className="flex items-center gap-1">
            <Code2 className="w-3 h-3" />
            {repo.defaultBranch}
          </span>
          <span className="text-[10px] text-gray-600">
            Last: {formatDate(repo.lastMigration)}
          </span>
        </div>
      </div>

      <button
        onClick={onMigrate}
        className="w-full px-3 py-2.5 rounded-xl glass-button text-sm font-medium flex items-center justify-between group"
      >
        <span>Start Migration</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}
