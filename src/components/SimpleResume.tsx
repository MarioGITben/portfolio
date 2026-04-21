import { motion } from 'framer-motion'
import { FileDown, MapPin, Moon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { awards, contact, simpleResume } from '../data'
import { useLenisInstance } from '../context/LenisContext'
import { BrandLogo } from './BrandLogo'
import { LangToggle } from './LangToggle'
import { useLanguage } from '../hooks/useLanguage'
import { useCopyContact, phoneDigitsForCopy } from '../hooks/useCopyContact'
import { pick, useMessages } from '../hooks/useMessages'
import { messages, resumeSaveEnglish as saveEn, type Locale } from '../locale/messages'

type Props = {
  onClose: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

const EDU_ORDER = { tertiary: 0, secondary: 1, primary: 2 } as const

type ResumeLabels = (typeof messages)['en']['resume']

type ResumeArticleProps = {
  mode: 'screen' | 'pdf'
  contentLocale: Locale
  labels: ResumeLabels
  lang: string
  onClose: () => void
  copyContact: ReturnType<typeof useCopyContact>['copy']
  m: ReturnType<typeof useMessages>
  setDownloadOpen: (open: boolean) => void
}

function ResumeArticle({
  mode,
  contentLocale,
  labels,
  lang,
  onClose,
  copyContact,
  m,
  setDownloadOpen,
}: ResumeArticleProps) {
  const isPdf = mode === 'pdf'
  const softSkills = simpleResume.softSkills[contentLocale]
  const useSoftSkillsTwoColumns = softSkills.length >= 4
  const articleClass = isPdf
    ? 'resume-print-article resume-print-pdf-clone mx-auto w-full max-w-7xl hidden print:block'
    : 'resume-print-article resume-print-screen mx-auto w-full max-w-7xl print:hidden'

  return (
    <motion.article
      lang={lang}
      aria-hidden={isPdf ? true : undefined}
      initial={false}
      animate={{ opacity: 1 }}
      className={articleClass}
    >
      <header className="border-b border-zinc-200 pb-4 sm:pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 self-start rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-800/40"
            title={m.nav.darkMode}
            aria-label={m.nav.darkMode}
            tabIndex={isPdf ? -1 : undefined}
          >
            <BrandLogo variant="resume" />
          </button>
          <div className="min-w-0 flex-1">
            <h1
              id={isPdf ? undefined : 'simple-resume-title'}
              className="font-display text-3xl tracking-tight text-zinc-950 sm:text-4xl"
            >
              {pick(simpleResume.headline, contentLocale)}
            </h1>
            <p className="mt-1.5 text-base text-zinc-600 sm:text-lg">{pick(simpleResume.tagline, contentLocale)}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-sans text-sm text-zinc-600">
              <button
                type="button"
                onClick={() => copyContact('email', contact.email)}
                className="cursor-pointer border-0 bg-transparent p-0 font-sans text-inherit text-zinc-600 underline-offset-2 hover:text-amber-900 hover:underline"
                title={m.contact.copyEmail}
                aria-label={m.contact.copyEmail}
                tabIndex={isPdf ? -1 : undefined}
              >
                {contact.email}
              </button>
              <span className="text-zinc-400" aria-hidden>
                ·
              </span>
              <button
                type="button"
                onClick={() => copyContact('phone', phoneDigitsForCopy(contact.phone))}
                className="cursor-pointer border-0 bg-transparent p-0 font-sans text-inherit text-zinc-600 underline-offset-2 hover:text-amber-900 hover:underline"
                title={m.contact.copyPhone}
                aria-label={m.contact.copyPhone}
                tabIndex={isPdf ? -1 : undefined}
              >
                {contact.phone}
              </button>
              <span className="text-zinc-400" aria-hidden>
                ·
              </span>
              <span>{pick(simpleResume.location, contentLocale)}</span>
            </p>
            {!isPdf ? (
              <button
                type="button"
                onClick={() => setDownloadOpen(true)}
                className="mt-3 inline-flex cursor-pointer items-center gap-2 font-sans text-sm text-amber-900 underline-offset-4 hover:underline md:hidden"
              >
                <FileDown className="size-4 shrink-0" aria-hidden />
                {saveEn.actionShort}
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <section className="border-b border-zinc-200 py-5 sm:py-6">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
          {labels.sectionSummary}
        </h2>
        <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-zinc-700 sm:text-base">
          {pick(simpleResume.summary, contentLocale)}
        </p>
      </section>

      <section className="border-b border-zinc-200 py-5 sm:py-6">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
          {labels.sectionExperience}
        </h2>
        <ul className="mt-4 space-y-6 sm:space-y-7">
          {simpleResume.experiences.map((exp) => (
            <li key={pick(exp.company, contentLocale)}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="font-display text-xl text-zinc-950">{pick(exp.role, contentLocale)}</p>
                  <p className="font-sans text-sm text-zinc-600">{pick(exp.company, contentLocale)}</p>
                </div>
                <p className="shrink-0 font-mono text-xs text-zinc-500">{pick(exp.period, contentLocale)}</p>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 font-sans text-sm leading-relaxed text-zinc-700">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{pick(b, contentLocale)}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-zinc-200 py-5 sm:py-6">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
          {labels.sectionEducation}
        </h2>
        <ul className="mt-4 space-y-6 sm:space-y-7">
          {[...simpleResume.education]
            .sort((a, b) => EDU_ORDER[a.level] - EDU_ORDER[b.level])
            .map((ed) => (
              <li key={`${ed.level}-${pick(ed.school, contentLocale)}`}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-900/90">
                  {ed.level === 'tertiary'
                    ? labels.eduLevelTertiary
                    : ed.level === 'secondary'
                      ? labels.eduLevelSecondary
                      : labels.eduLevelPrimary}
                </p>
                <div className="mt-1.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="font-display text-lg text-zinc-950">{pick(ed.school, contentLocale)}</p>
                  <p className="shrink-0 font-mono text-xs text-zinc-500">{pick(ed.period, contentLocale)}</p>
                </div>
                <p className="mt-1 flex items-start gap-1.5 font-sans text-sm text-zinc-600">
                  <MapPin className="mt-0.5 size-3 shrink-0 text-zinc-500" strokeWidth={2} aria-hidden />
                  <span>{pick(ed.location, contentLocale)}</span>
                </p>
              </li>
            ))}
        </ul>
      </section>

      <section className="border-b border-zinc-200 py-5 sm:py-6">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
          {labels.sectionAwardsCertificates}
        </h2>
        <ul className="mt-4 space-y-5 sm:space-y-6">
          {awards.map((a) => (
            <li key={pick(a.title, contentLocale)}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-display text-lg text-zinc-950">{pick(a.title, contentLocale)}</p>
                <p className="shrink-0 font-mono text-xs text-zinc-500">{pick(a.period, contentLocale)}</p>
              </div>
              <p className="mt-1 font-sans text-sm text-zinc-600">{pick(a.issuer, contentLocale)}</p>
              {a.detail ? (
                <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-700">{pick(a.detail, contentLocale)}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="py-5 sm:py-6">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <div className="min-w-0 flex-1">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
              {labels.sectionSoftSkills}
            </h2>
            <ul
              className={`mt-3 list-disc pl-5 font-sans text-sm leading-relaxed text-zinc-700 ${useSoftSkillsTwoColumns ? 'grid grid-cols-2 gap-x-6 gap-y-1.5' : 'space-y-1.5'}`}
            >
              {softSkills.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-900">
              {labels.sectionTechSkills}
            </h2>
            <div className="mt-3 flex flex-col gap-2 font-sans text-sm leading-relaxed text-zinc-700">
              {simpleResume.techSkills[contentLocale].map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.article>
  )
}

/** Opens the system print dialog so the visitor can save the on-screen résumé as PDF. */
function triggerResumePrint(suggestedSaveTitle: string) {
  const prevTitle = document.title
  document.title = suggestedSaveTitle
  document.documentElement.classList.add('resume-printing')
  let finished = false
  const cleanup = () => {
    if (finished) return
    finished = true
    document.documentElement.classList.remove('resume-printing')
    document.title = prevTitle
    window.removeEventListener('afterprint', cleanup)
    window.clearTimeout(fallbackTimer)
  }
  window.addEventListener('afterprint', cleanup)
  const fallbackTimer = window.setTimeout(cleanup, 90_000)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.print()
    })
  })
}

export function SimpleResume({ onClose }: Props) {
  const { locale } = useLanguage()
  const m = useMessages()
  const closeRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const downloadCancelRef = useRef<HTMLButtonElement>(null)
  const lenis = useLenisInstance()
  const [downloadOpen, setDownloadOpen] = useState(false)
  const { copy: copyContact } = useCopyContact()

  const trapWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (downloadOpen) {
        setDownloadOpen(false)
        return
      }
      onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, downloadOpen])

  useEffect(() => {
    if (!downloadOpen) return
    downloadCancelRef.current?.focus()
  }, [downloadOpen])

  useEffect(() => {
    lenis?.stop()
    return () => {
      lenis?.start()
    }
  }, [lenis])

  const screenLang = locale === 'tl' ? 'tl' : 'en'

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="simple-resume-title"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease }}
      className="resume-print-root fixed inset-0 z-[100] bg-white text-zinc-900"
    >
      {/* Scroll layer: native overflow so Lenis never eats wheel; stopPropagation keeps Lenis from seeing bubbled events */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="resume-print-scroll h-[100dvh] max-h-[100dvh] overflow-y-scroll overscroll-y-contain px-4 pb-24 pt-4 sm:px-8 sm:pb-28 sm:pt-5"
        style={{ touchAction: 'pan-y' }}
        onWheel={trapWheel}
        onWheelCapture={trapWheel}
      >
        <ResumeArticle
          mode="screen"
          contentLocale={locale}
          labels={m.resume}
          lang={screenLang}
          onClose={onClose}
          copyContact={copyContact}
          m={m}
          setDownloadOpen={setDownloadOpen}
        />
        <ResumeArticle
          mode="pdf"
          contentLocale="en"
          labels={messages.en.resume}
          lang="en"
          onClose={onClose}
          copyContact={copyContact}
          m={m}
          setDownloadOpen={setDownloadOpen}
        />
      </div>

      {/* Floating bubble — bottom-right */}
      <div
        className="resume-print-exclude pointer-events-none fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-2 sm:bottom-8 sm:right-8"
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
          <button
            type="button"
            onClick={() => setDownloadOpen(true)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-amber-800/35 hover:bg-zinc-50 hover:text-zinc-900"
            title={saveEn.actionShort}
            aria-label={saveEn.actionShort}
          >
            <FileDown className="size-5" aria-hidden />
          </button>
          <div className="border-t border-zinc-100 px-1 py-2">
            <LangToggle tone="light" className="w-full" />
          </div>
        </div>
      </div>

      {downloadOpen ? (
        <div
          className="resume-print-exclude fixed inset-0 z-[120] flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDownloadOpen(false)
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="resume-download-title"
            aria-describedby="resume-download-desc"
            className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.35)] sm:p-6"
          >
            <h2 id="resume-download-title" className="font-display text-xl text-zinc-950">
              {saveEn.confirmTitle}
            </h2>
            <p id="resume-download-desc" className="mt-2 font-sans text-sm leading-relaxed text-zinc-600">
              {saveEn.confirmBody}
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                ref={downloadCancelRef}
                type="button"
                onClick={() => setDownloadOpen(false)}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 font-sans text-sm text-zinc-800 transition-colors hover:bg-zinc-50"
              >
                {saveEn.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  const suggested = `${pick(simpleResume.headline, 'en')} — Resume`
                  setDownloadOpen(false)
                  triggerResumePrint(suggested)
                }}
                className="rounded-xl border border-amber-900/30 bg-amber-950 px-4 py-2.5 font-sans text-sm font-medium text-amber-50 transition-colors hover:bg-zinc-900"
              >
                {saveEn.confirmPrimary}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  )
}
