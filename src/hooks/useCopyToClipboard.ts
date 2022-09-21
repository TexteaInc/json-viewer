import copyToClipboard from 'copy-to-clipboard'
import { useCallback, useRef, useState } from 'react'

/**
 * useClipboard hook accepts one argument options in which copied status timeout duration is defined (defaults to 2000). Hook returns object with properties:
 * - copy – function to copy value to clipboard
 * - copied – value that indicates that copy handler was called less than options.timeout ms ago
 * - reset – function to clear timeout and reset copied to false
 */
export function useClipboard ({ timeout = 2000 } = {}) {
  const [copied, setCopied] = useState(false)
  const copyTimeout = useRef<number | null>(null)

  const handleCopyResult = useCallback((value: boolean) => {
    const current = copyTimeout.current
    if (current) {
      window.clearTimeout(current)
    }
    copyTimeout.current = window.setTimeout(() => setCopied(false), timeout)
    setCopied(value)
  }, [timeout])

  const copy = useCallback((valueToCopy: string) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        // When navigator.clipboard throws an error, fallback to copy-to-clipboard package
        .catch(() => copyToClipboard(valueToCopy))
    } else {
      // fallback to copy-to-clipboard when navigator.clipboard is not available
      copyToClipboard(valueToCopy)
    }
  }, [handleCopyResult])

  const reset = useCallback(() => {
    setCopied(false)
    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current)
    }
  }, [])

  return { copy, reset, copied }
}
