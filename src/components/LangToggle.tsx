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
      ? 'border border-zinc-300 bg-zinc-50/80'
      : 'border border-white/10'

  const active = tone === 'light' ? 'bg-amber-100 text-amber-950' : 'bg-accent/20 text-accent'
  const idle = tone === 'light' ? 'text-zinc-600 hover:text-zinc-900' : 'text-dim hover:text-ink'

  return (
    <div
      className={`flex items-center rounded-sm p-0.5 font-mono text-[11px] uppercase tracking-wider ${shell} ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`rounded-sm px-2.5 py-1 transition-colors ${
          locale === 'en' ? active : idle
        }`}
      >
        {m.nav.langEn}
      </button>
      <button
        type="button"
        onClick={() => setLocale('tl')}
        aria-pressed={locale === 'tl'}
        className={`rounded-sm px-2.5 py-1 transition-colors ${
          locale === 'tl' ? active : idle
        }`}
      >
        {m.nav.langTl}
      </button>
    </div>
  )
}
