import { useLanguage } from '../hooks/useLanguage'
import { useMessages } from '../hooks/useMessages'

type Props = {
  className?: string
  /** Light chrome for résumé / light backgrounds */
  tone?: 'dark' | 'light'
}

export function LangToggle({ className = '', tone = 'dark' }: Props) {
  const { locale, setLocale } = useLanguage()
  const m = useMessages()

  const shell =
    tone === 'light'
      ? 'border border-zinc-300 bg-zinc-50/80 text-zinc-800'
      : 'border border-white/10 text-ink'

  const activeStyles =
    tone === 'light'
      ? 'bg-amber-100 text-amber-950 hover:bg-amber-200/90'
      : 'bg-accent/20 text-accent hover:bg-accent/25'

  const toggle = () => setLocale(locale === 'en' ? 'tl' : 'en')

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex min-w-[2.75rem] cursor-pointer items-center justify-center rounded-sm px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${shell} ${activeStyles} ${className}`}
      aria-label={locale === 'en' ? m.nav.switchToTagalog : m.nav.switchToEnglish}
    >
      {locale === 'en' ? m.nav.langEn : m.nav.langTl}
    </button>
  )
}
