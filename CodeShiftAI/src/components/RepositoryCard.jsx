import { GitBranch, Code2, ArrowRight } from 'lucide-react'

export default function RepositoryCard({ repo, ProviderIcon, formatDate, onMigrate }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
      {repo.lastMigration && (
        <div className="absolute -top-2.5 -right-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 text-[10px] font-medium rounded">
          Migrated
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-gray-900 rounded-lg p-2 flex-shrink-0">
            <ProviderIcon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate text-base">{repo.name}</h3>
            <p className="text-xs text-gray-500 truncate font-mono">{repo.fullName}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{repo.description}</p>

        <div className="border-t border-gray-100 pt-3 mb-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              {repo.language} {repo.sourceVersion}
            </span>
            <span className="flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              {repo.defaultBranch}
            </span>
            <span className="text-gray-400">
              Last: {formatDate(repo.lastMigration)}
            </span>
          </div>
        </div>

        <button
          onClick={onMigrate}
          className="w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center justify-between group"
        >
          <span>Start Migration</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}
