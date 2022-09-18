import { useEffect, useState } from 'react'

const query = '(prefers-color-scheme: dark)'
export function useThemeDetector () {
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }
    setIsDark(window.matchMedia(query).matches)
    const queryMedia = window.matchMedia(query)
    queryMedia.addEventListener('change', listener)
    return () => queryMedia.removeEventListener('change', listener)
  }, [])
  return isDark
}
