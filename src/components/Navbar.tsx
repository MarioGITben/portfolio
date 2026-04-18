import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Sun, X } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { BrandLogo } from './BrandLogo'
import { LangToggle } from './LangToggle'
import { useMessages } from '../hooks/useMessages'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollToHash } from '../hooks/useScrollToHash'

const easeNav = [0.22, 1, 0.36, 1] as const

const mobileNavContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.042, delayChildren: 0.06 },
  },
}

const mobileNavItem = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.36, ease: easeNav },
  },
}

type NavbarProps = {
  /** Light mode = résumé view */
  resumeOpen?: boolean
  onLightMode?: () => void
}

export function Navbar({ resumeOpen = false, onLightMode }: NavbarProps) {
  const scrollTo = useScrollToHash()
  const active = useActiveSection()
  const m = useMessages()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const links = [
    { id: 'about' as const, label: m.nav.about },
    { id: 'projects' as const, label: m.nav.projects },
    { id: 'skills' as const, label: m.nav.skills },
    { id: 'awards' as const, label: m.nav.awards },
    { id: 'contact' as const, label: m.nav.contact },
  ]

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
  })

  const onNav = useCallback(
    (hash: string) => {
      scrollTo(hash)
      setOpen(false)
    },
    [scrollTo],
  )

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    focusables?.[0]?.focus()

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key !== 'Tab' || !panelRef.current) return
      const list = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ]
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const onOverlayKey = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ease-smooth ${
          scrolled ? 'border-b border-divider bg-canvas/75 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {!resumeOpen ? (
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                onNav('#hero')
              }}
              className="shrink-0 text-ink transition-opacity hover:opacity-90"
              aria-label="Home"
            >
              <BrandLogo variant="portfolio" />
            </a>
          ) : (
            <span className="inline-block h-10 w-[7.5rem] shrink-0 sm:w-[8rem]" aria-hidden />
          )}

          <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNav(`#${l.id}`)
                }}
                aria-current={active === l.id ? 'page' : undefined}
                className={`relative shrink-0 font-sans text-sm text-dim transition-colors hover:text-ink ${
                  active === l.id ? 'text-ink' : ''
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px origin-left bg-accent transition-[width,opacity] duration-300 ease-out ${
                    active === l.id ? 'w-full opacity-100' : 'w-0 opacity-0 hover:w-full hover:opacity-100'
                  }`}
                />
              </a>
            ))}
            {onLightMode ? (
              <button
                type="button"
                onClick={onLightMode}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-ink/90 transition-colors hover:border-accent/30 hover:bg-white/[0.08] hover:text-ink"
                title={m.nav.lightMode}
                aria-label={m.nav.lightMode}
              >
                <Sun className="size-[1.125rem] text-accent" aria-hidden />
              </button>
            ) : null}
            <LangToggle />
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            {onLightMode ? (
              <button
                type="button"
                onClick={onLightMode}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-ink/90 transition-colors hover:border-accent/30 hover:bg-white/[0.08]"
                title={m.nav.lightMode}
                aria-label={m.nav.lightMode}
              >
                <Sun className="size-[1.125rem] text-accent" aria-hidden />
              </button>
            ) : null}
            <LangToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-sm p-2 text-ink"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: easeNav }}
            className="fixed inset-0 z-40 flex flex-col bg-canvas/97 px-6 pb-10 pt-24 backdrop-blur-lg md:hidden"
            onKeyDown={onOverlayKey}
          >
            <motion.nav
              className="flex flex-1 flex-col gap-6"
              aria-label="Mobile primary"
              variants={mobileNavContainer}
              initial="hidden"
              animate="visible"
            >
              {links.map((l) => (
                <motion.a
                  key={l.id}
                  layout={false}
                  variants={mobileNavItem}
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onNav(`#${l.id}`)
                  }}
                  className="font-display text-3xl text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
              {onLightMode ? (
                <motion.button
                  type="button"
                  layout={false}
                  variants={mobileNavItem}
                  onClick={() => {
                    onLightMode()
                    setOpen(false)
                  }}
                  className="inline-flex size-14 w-fit items-center justify-center rounded-full border border-white/15 bg-white/5 text-dim transition-colors hover:border-accent/30 hover:bg-white/10 hover:text-ink"
                  title={m.nav.lightMode}
                  aria-label={m.nav.lightMode}
                >
                  <Sun className="size-8 text-accent" aria-hidden />
                </motion.button>
              ) : null}
              <motion.div layout={false} variants={mobileNavItem} className="mt-auto">
                <LangToggle className="justify-center" />
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
