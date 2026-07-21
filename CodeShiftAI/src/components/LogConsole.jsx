import { useEffect, useRef } from 'react'

export default function LogConsole({ logs }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="bg-gray-950 text-gray-100 p-4 rounded-b-xl font-mono text-xs leading-relaxed h-64 overflow-y-auto">
      {logs.length === 0 ? (
        <div className="text-gray-500 italic">Waiting for logs...</div>
      ) : (
        logs.map((log, i) => (
          <div key={i} className={`${
            log.level === 'warn' ? 'text-amber-400' :
            log.level === 'critical' ? 'text-red-400' :
            'text-gray-300'
          }`}>
            <span className="text-gray-500">[{log.timestamp}]</span>{' '}
            {log.text}
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  )
}
