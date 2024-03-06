import { useCallback, useRef } from 'react'

const DEFAULT_DELAY = 300

export default function useDebounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number = DEFAULT_DELAY
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  const cancelDebounce = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return { debouncedCallback, cancelDebounce }
}
