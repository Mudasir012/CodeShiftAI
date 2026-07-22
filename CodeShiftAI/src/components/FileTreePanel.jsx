import { FileCode, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

export default function FileTreePanel({ files, selectedPath, onSelect, getFileStatus }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-100">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Files</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {files.map(file => {
          const status = getFileStatus(file)
          const StatusIcon = status.icon
          return (
            <button
              key={file.path}
              onClick={() => onSelect(file)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                selectedPath === file.path
                  ? 'bg-violet-50 text-violet-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileCode className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="truncate flex-1 font-mono text-xs">{file.path.split('/').pop()}</span>
              <StatusIcon className={`w-3.5 h-3.5 flex-shrink-0 ${status.color}`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
