import { AnimatePresence, motion } from 'framer-motion'
import { Award, Expand, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { awards } from '../data'
import { SectionHeading } from '../components/SectionHeading'
import { TiltFrame } from '../components/TiltFrame'
import { useLanguage } from '../hooks/useLanguage'
import { useMessages } from '../hooks/useMessages'
import { pick } from '../hooks/useMessages'
import { useReducedMotion } from '../hooks/useReducedMotion'

const makeContainer = (reduced: boolean) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduced ? 0 : 0.07,
      delayChildren: reduced ? 0 : 0.02,
    },
  },
})

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

type CredentialModal = { src: string; title: string }

export function Awards() {
  const reduced = useReducedMotion()
  const { locale } = useLanguage()
  const m = useMessages()
  const container = makeContainer(reduced)
  const titleId = useId()
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const [credentialModal, setCredentialModal] = useState<CredentialModal | null>(null)

  const closeModal = useCallback(() => setCredentialModal(null), [])

  useEffect(() => {
    if (!credentialModal) return
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    queueMicrotask(() => closeBtnRef.current?.focus())

    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [credentialModal, closeModal])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const credentialPortal =
    typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence
            onExitComplete={() => {
              document.body.style.overflow = ''
            }}
          >
            {credentialModal ? (
              <motion.div
                key={credentialModal.src}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
              >
                <button
                  type="button"
                  className="absolute inset-0 bg-canvas/85 backdrop-blur-md"
                  aria-label={m.awards.closeModal}
                  onClick={closeModal}
                />
                <motion.div
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 flex max-h-[min(90dvh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-card border border-white/15 bg-elevated shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-divider px-4 py-3 sm:px-5">
                    <h2 id={titleId} className="pr-2 font-display text-lg text-ink sm:text-xl">
                      {credentialModal.title}
                    </h2>
                    <button
                      ref={closeBtnRef}
                      type="button"
                      onClick={closeModal}
                      className="shrink-0 rounded-sm border border-white/10 p-2 text-dim transition-colors hover:border-accent/30 hover:text-ink"
                      aria-label={m.awards.closeModal}
                    >
                      <X className="size-5" aria-hidden />
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto bg-canvas/50 p-3 sm:p-5">
                    <img
                      src={credentialModal.src}
                      alt=""
                      className="mx-auto block h-auto max-h-[min(75dvh,800px)] w-full max-w-full object-contain"
                      decoding="async"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null

  return (
    <section
      id="awards"
      className="scroll-mt-24 border-t border-divider bg-canvas px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={m.awards.eyebrow} title={m.awards.title} />

        <motion.ul
          variants={container}
          initial={reduced ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-8%' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {awards.map((a, i) => {
            const hasImage = Boolean(a.image)

            return (
              <motion.li key={i} variants={item} className="min-h-0">
                <TiltFrame
                  className={`relative flex h-full flex-col overflow-hidden rounded-card border p-6 shadow-inner transition-colors hover:z-[1] ${
                    hasImage
                      ? 'group min-h-[280px] border-white/15 hover:border-accent/35'
                      : 'border-white/[0.1] bg-surface/80 backdrop-blur-sm hover:border-accent/25'
                  }`}
                >
                  {hasImage ? (
                    <>
                      <div
                        className="absolute inset-0 origin-center bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-smooth group-hover:scale-[1.02]"
                        style={{ backgroundImage: `url(${a.image})` }}
                        aria-hidden
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/90 to-canvas/35"
                        aria-hidden
                      />
                    </>
                  ) : null}

                  <div className="relative z-10 flex flex-1 flex-col">
                    <div
                      className={`mb-4 inline-flex size-10 items-center justify-center rounded-sm border text-accent ${
                        hasImage
                          ? 'border-white/25 bg-black/35 backdrop-blur-sm'
                          : 'border-accent/30 bg-accent/10'
                      }`}
                    >
                      <Award className="size-5" aria-hidden />
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                      {pick(a.period, locale)}
                    </p>
                    <motion.h3
                      layout={false}
                      initial={reduced ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.55 }}
                      transition={{
                        duration: reduced ? 0 : 0.62,
                        delay: reduced ? 0 : 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mt-2 font-display text-lg tracking-tight text-ink will-change-transform md:text-xl"
                    >
                      {pick(a.title, locale)}
                    </motion.h3>
                    <p className="mt-1 font-sans text-sm text-dim">{pick(a.issuer, locale)}</p>
                    {a.detail ? (
                      <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-dim/95">
                        {pick(a.detail, locale)}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}
                    {hasImage ? (
                      <button
                        type="button"
                        onClick={() =>
                          setCredentialModal({
                            src: a.image!,
                            title: pick(a.title, locale),
                          })
                        }
                        className="mt-4 inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent transition-opacity hover:opacity-90"
                      >
                        {m.awards.credentialLink}
                        <Expand className="size-3.5" aria-hidden />
                      </button>
                    ) : null}
                  </div>
                </TiltFrame>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>

      {credentialPortal}
    </section>
  )
}
