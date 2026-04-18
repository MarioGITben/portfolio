import { site, footer } from '../data'
import { useLanguage } from '../hooks/useLanguage'
import { pick } from '../hooks/useMessages'

type FooterProps = { className?: string }

export function Footer({ className }: FooterProps) {
  const { locale } = useLanguage()

  return (
    <footer
      className={`border-t border-divider bg-elevated px-4 py-10 sm:px-6 lg:px-8${className ? ` ${className}` : ''}`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <img
          src="/logo-portfolio.png"
          alt=""
          width={180}
          height={48}
          className="h-9 w-auto max-w-[min(100%,12rem)] object-contain object-center"
          decoding="async"
        />
        <p className="font-sans text-sm text-dim">
          © {new Date().getFullYear()} {pick(site.name, locale)}. {pick(footer.tagline, locale)}
        </p>
      </div>
    </footer>
  )
}
