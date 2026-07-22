import { FileCode } from 'lucide-react'

export default function FileTreePanel({ files, selectedPath, onSelect, getFileStatus }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Files</h3>
      </div>
      <div className="divide-y divide-white/5">
        {files.map(file => {
          const status = getFileStatus(file)
          const StatusIcon = status.icon
          return (
            <button
              key={file.path}
              onClick={() => onSelect(file)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                selectedPath === file.path
                  ? 'bg-purple-500/10 text-purple-300'
                  : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <FileCode className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="truncate flex-1 font-mono text-xs">{file.path.split('/').pop()}</span>
              <StatusIcon className={`w-3.5 h-3.5 flex-shrink-0 ${status.color}`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
