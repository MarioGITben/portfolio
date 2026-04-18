import { motion } from 'framer-motion'
import { FileDown, Moon } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { contact, simpleResume } from '../data'
import { useLenisInstance } from '../context/LenisContext'
import { BrandLogo } from './BrandLogo'
import { LangToggle } from './LangToggle'
import { useLanguage } from '../hooks/useLanguage'
import { pick, useMessages } from '../hooks/useMessages'

type Props = {
  onClose: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

export function SimpleResume({ onClose }: Props) {
  const { locale } = useLanguage()
  const m = useMessages()
  const closeRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lenis = useLenisInstance()

  const trapWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useEffect(() => {
    lenis?.stop()
    return () => {
      lenis?.start()
    }
  }, [lenis])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="simple-resume-title"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease }}
      className="fixed inset-0 z-[100] bg-white text-zinc-900"
    >
      {/* Scroll layer: native overflow so Lenis never eats wheel; stopPropagation keeps Lenis from seeing bubbled events */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="h-[100dvh] max-h-[100dvh] overflow-y-scroll overscroll-y-contain px-4 pb-24 pt-4 sm:px-8 sm:pb-28 sm:pt-5"
        style={{ touchAction: 'pan-y' }}
        onWheel={trapWheel}
        onWheelCapture={trapWheel}
      >
        <motion.article
          initial={false}
          animate={{ opacity: 1 }}
          className="mx-auto w-full max-w-7xl"
        >
          <header className="border-b border-zinc-200 pb-4 sm:pb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 self-start rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-800/40"
                title={m.nav.darkMode}
                aria-label={m.nav.darkMode}
              >
                <BrandLogo variant="resume" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 id="simple-resume-title" className="font-display text-3xl tracking-tight text-zinc-950 sm:text-4xl">
                  {pick(simpleResume.headline, locale)}
                </h1>
                <p className="mt-1.5 text-base text-zinc-600 sm:text-lg">{pick(simpleResume.tagline, locale)}</p>
                <p className="mt-2 font-sans text-sm text-zinc-600">
                  {contact.email} · {pick(simpleResume.location, locale)}
                </p>
                <a
                  href="/resume.pdf"
                  className="mt-3 inline-flex items-center gap-2 font-sans text-sm text-amber-900 underline-offset-4 hover:underline md:hidden"
                  download
                >
                  <FileDown className="size-4 shrink-0" aria-hidden />
                  {m.resume.downloadPdf}
                </a>
              </div>
            </div>
          </header>

          <section className="border-b border-zinc-200 py-5 sm:py-6">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
              {m.resume.sectionSummary}
            </h2>
            <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-zinc-700 sm:text-base">
              {pick(simpleResume.summary, locale)}
            </p>
          </section>

          <section className="border-b border-zinc-200 py-5 sm:py-6">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
              {m.resume.sectionExperience}
            </h2>
            <ul className="mt-4 space-y-6 sm:space-y-7">
              {simpleResume.experiences.map((exp) => (
                <li key={pick(exp.company, locale)}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <p className="font-display text-xl text-zinc-950">{pick(exp.role, locale)}</p>
                      <p className="font-sans text-sm text-zinc-600">{pick(exp.company, locale)}</p>
                    </div>
                    <p className="shrink-0 font-mono text-xs text-zinc-500">{pick(exp.period, locale)}</p>
                  </div>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 font-sans text-sm leading-relaxed text-zinc-700">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{pick(b, locale)}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-b border-zinc-200 py-5 sm:py-6">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
              {m.resume.sectionEducation}
            </h2>
            <p className="mt-3 font-display text-lg text-zinc-950">{pick(simpleResume.education.school, locale)}</p>
            <p className="mt-1.5 font-sans text-sm leading-relaxed text-zinc-700">
              {pick(simpleResume.education.detail, locale)}
            </p>
          </section>

          <section className="py-5 sm:py-6">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
              {m.resume.sectionSkills}
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-zinc-700">{pick(simpleResume.skills, locale)}</p>
          </section>
        </motion.article>
      </div>

      {/* Floating bubble — bottom-right */}
      <div
        className="pointer-events-none fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-2 sm:bottom-8 sm:right-8"
        aria-label="Resume actions"
      >
        <div className="pointer-events-auto flex flex-col gap-2 rounded-2xl border border-zinc-200/90 bg-white/95 p-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-900 text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            title={m.nav.darkMode}
            aria-label={m.nav.darkMode}
          >
            <Moon className="size-5" aria-hidden />
          </button>
          <a
            href="/resume.pdf"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-amber-800/35 hover:bg-zinc-50 hover:text-zinc-900"
            download
            title={m.resume.downloadPdf}
            aria-label={m.resume.downloadPdf}
          >
            <FileDown className="size-5" aria-hidden />
          </a>
          <div className="border-t border-zinc-100 px-1 py-2">
            <LangToggle tone="light" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
