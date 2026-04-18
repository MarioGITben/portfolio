import { messages, type Locale } from '../locale/messages'
import { useLanguage } from './useLanguage'

export function useMessages() {
  const { locale } = useLanguage()
  return messages[locale]
}

export function pick<T extends { en: string; tl: string }>(v: T, locale: Locale): string {
  return locale === 'tl' ? v.tl : v.en
}
