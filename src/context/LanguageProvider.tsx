import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { Locale } from '../locale/messages'
import { LanguageContext } from './language-context'

const STORAGE_KEY = 'portfolio-locale'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY)
      if (s === 'tl' || s === 'en') return s
    } catch {
      /* ignore */
    }
    return 'en'
  })

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
