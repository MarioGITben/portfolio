import { createContext } from 'react'
import type { Locale } from '../locale/messages'

export type LanguageContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
