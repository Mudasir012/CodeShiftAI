import { GitBranch, Code2, ArrowRight } from 'lucide-react'

export default function RepositoryCard({ repo, ProviderIcon, formatDate, onMigrate }) {
  return (
    <div className="relative bg-white border border-gray-200/80 rounded-xl hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group/card">
      {repo.lastMigration && (
        <div className="absolute -top-2.5 right-3 bg-emerald-50 border border-emerald-200/80 text-emerald-700 px-2.5 py-0.5 text-[10px] font-semibold rounded-full shadow-2xs flex items-center gap-1 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Migrated
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-gray-900 rounded-xl p-2.5 flex-shrink-0 shadow-xs group-hover/card:bg-violet-950 transition-colors">
            <ProviderIcon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-gray-900 truncate text-base group-hover/card:text-violet-900 transition-colors">{repo.name}</h3>
            <p className="text-xs text-gray-400 truncate font-mono">{repo.fullName}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">{repo.description}</p>

        <div className="border-t border-gray-100 pt-3 mb-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 font-medium px-2 py-0.5 bg-gray-50 rounded-md border border-gray-100">
              <GitBranch className="w-3.5 h-3.5 text-violet-500" />
              {repo.language} {repo.sourceVersion}
            </span>
            <span className="flex items-center gap-1 text-gray-500 font-mono text-[11px]">
              <Code2 className="w-3.5 h-3.5 text-gray-400" />
              {repo.defaultBranch}
            </span>
            <span className="text-gray-400 text-[11px] ml-auto">
              Last: <strong className="font-semibold text-gray-600">{formatDate(repo.lastMigration)}</strong>
            </span>
          </div>
        </div>

        <button
          onClick={onMigrate}
          className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200/80 rounded-lg hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all flex items-center justify-between group/btn shadow-xs cursor-pointer"
        >
          <span>Start Migration</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
