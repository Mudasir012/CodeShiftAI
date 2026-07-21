import { useEffect, useRef, useCallback } from 'react'

export function useMockStream(jobId, onEvent, enabled = true) {
  const cleanupRef = useRef(null)

  const start = useCallback(() => {
    import('../mock/migrations.js').then(({ streamProgress }) => {
      cleanupRef.current = streamProgress(jobId, onEvent)
    })
  }, [jobId, onEvent])

  useEffect(() => {
    if (enabled && jobId) start()
    return () => { if (cleanupRef.current) cleanupRef.current() }
  }, [jobId, enabled, start])
}
