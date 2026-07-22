export default function DiffViewer({ original, migrated }) {
  const originalLines = original.split('\n')
  const migratedLines = migrated.split('\n')

  return (
    <div className="grid grid-cols-2 divide-x divide-white/10 font-mono text-xs leading-relaxed">
      <div className="bg-black/30">
        <div className="px-3 py-1 text-xs font-medium text-gray-500 bg-white/5 border-b border-white/5">Original</div>
        {originalLines.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-8 flex-shrink-0 text-right pr-2 text-gray-600 select-none border-r border-white/5 py-px">{i + 1}</span>
            <span className="px-3 py-px text-gray-400 whitespace-pre-wrap break-all">{line || ' '}</span>
          </div>
        ))}
      </div>
      <div className="bg-black/20">
        <div className="px-3 py-1 text-xs font-medium text-gray-500 bg-white/5 border-b border-white/5">Migrated</div>
        {migratedLines.map((line, i) => {
          const isAdded = !original.includes(line)
          return (
            <div key={i} className={`flex ${isAdded ? 'bg-emerald-500/10' : ''}`}>
              <span className="w-8 flex-shrink-0 text-right pr-2 text-gray-600 select-none border-r border-white/5 py-px">{i + 1}</span>
              <span className={`px-3 py-px whitespace-pre-wrap break-all ${isAdded ? 'text-emerald-300' : 'text-gray-400'}`}>{line || ' '}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
