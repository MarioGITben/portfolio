import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { useMessages } from '../hooks/useMessages'
import { useReducedMotion } from '../hooks/useReducedMotion'

const easeSmooth = [0.22, 1, 0.36, 1] as const
const SWIPE_THRESHOLD = 50

type Props = {
  open: boolean
  onClose: () => void
  title: string
  images: string[]
}

export function ProjectGalleryModal({ open, onClose, title, images }: Props) {
  const reduced = useReducedMotion()
  const m = useMessages()
  const titleId = useId()
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const pointerStartX = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const list = images.filter(Boolean)
  const count = list.length

  const closeModal = useCallback(() => onClose(), [onClose])

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (count === 0) return
      setDirection(dir)
      setActiveIndex(((next % count) + count) % count)
    },
    [count],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo])

  useEffect(() => {
    if (!open) return
    setDirection(0)
    setActiveIndex(0)
  }, [open, title])

  useEffect(() => {
    if (!open || count === 0) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (count > 1 && e.key === 'ArrowLeft') {
        e.preventDefault()
        setDirection(-1)
        setActiveIndex((i) => (i - 1 + count) % count)
      }
      if (count > 1 && e.key === 'ArrowRight') {
        e.preventDefault()
        setDirection(1)
        setActiveIndex((i) => (i + 1) % count)
      }
    }
    document.addEventListener('keydown', onKey)
    queueMicrotask(() => closeBtnRef.current?.focus())
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeModal, count])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!open || count <= 1) return
    thumbRefs.current[activeIndex]?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeIndex, open, count, reduced])

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (count <= 1 || e.button !== 0) return
    pointerStartX.current = e.clientX
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (pointerStartX.current == null || count <= 1) return
    const delta = e.clientX - pointerStartX.current
    pointerStartX.current = null
    if (Math.abs(delta) < SWIPE_THRESHOLD) return
    if (delta < 0) goNext()
    else goPrev()
  }

  function onPointerCancel() {
    pointerStartX.current = null
  }

  const slideVariants = {
    enter: (dir: number) =>
      reduced
        ? { opacity: 0, x: 0 }
        : { opacity: 0, x: dir >= 0 ? 56 : -56 },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      reduced
        ? { opacity: 0, x: 0 }
        : { opacity: 0, x: dir >= 0 ? -56 : 56 },
  }

  const portal =
    typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence
            onExitComplete={() => {
              document.body.style.overflow = ''
            }}
          >
            {open && count > 0 ? (
              <motion.div
                key={title}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.28, ease: easeSmooth }}
                className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
              >
                <button
                  type="button"
                  className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
                  aria-label={m.awards.closeModal}
                  onClick={closeModal}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.12),transparent_65%)]"
                  aria-hidden
                />
                <motion.div
                  initial={reduced ? false : { opacity: 0, scale: 0.96, y: 28 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97, y: 16 }}
                  transition={{ duration: 0.38, ease: easeSmooth }}
                  className="relative z-10 flex max-h-[min(92dvh,920px)] w-full max-w-5xl flex-col overflow-hidden rounded-card border border-white/15 bg-elevated shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex shrink-0 items-start justify-between gap-4 border-b border-divider px-4 py-3 sm:px-5">
                    <div className="min-w-0 pr-2">
                      <h2 id={titleId} className="font-display text-lg text-ink sm:text-xl">
                        {title}
                      </h2>
                      {count > 1 ? (
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                          {m.projects.galleryCounter
                            .replace('{n}', String(activeIndex + 1))
                            .replace('{total}', String(count))}
                        </p>
                      ) : null}
                    </div>
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

                  <div className="relative min-h-0 flex-1 bg-canvas/50">
                    <div
                      className="relative flex touch-pan-y items-center justify-center p-3 sm:p-6"
                      onPointerDown={onPointerDown}
                      onPointerUp={onPointerUp}
                      onPointerCancel={onPointerCancel}
                    >
                      {count > 1 ? (
                        <button
                          type="button"
                          onClick={goPrev}
                          className="absolute left-2 top-1/2 z-[1] -translate-y-1/2 rounded-sm border border-white/15 bg-elevated/90 p-2 text-ink shadow-md backdrop-blur-sm transition-colors hover:border-accent/35 sm:left-4"
                          aria-label={m.projects.galleryGoPrev}
                        >
                          <ChevronLeft className="size-5 sm:size-6" aria-hidden />
                        </button>
                      ) : null}
                      <div className="relative flex min-h-[min(52dvh,520px)] w-full items-center justify-center overflow-hidden">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                          <motion.div
                            key={list[activeIndex]}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: reduced ? 0.15 : 0.32, ease: easeSmooth }}
                            className="flex w-full justify-center"
                          >
                            <img
                              src={list[activeIndex]}
                              alt=""
                              className="max-h-[min(70dvh,780px)] w-auto max-w-full select-none object-contain"
                              decoding="async"
                              draggable={false}
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      {count > 1 ? (
                        <button
                          type="button"
                          onClick={goNext}
                          className="absolute right-2 top-1/2 z-[1] -translate-y-1/2 rounded-sm border border-white/15 bg-elevated/90 p-2 text-ink shadow-md backdrop-blur-sm transition-colors hover:border-accent/35 sm:right-4"
                          aria-label={m.projects.galleryGoNext}
                        >
                          <ChevronRight className="size-5 sm:size-6" aria-hidden />
                        </button>
                      ) : null}
                    </div>

                    {count > 1 ? (
                      <div className="flex gap-2 overflow-x-auto border-t border-divider bg-elevated/80 px-3 py-3 sm:px-4">
                        {list.map((src, i) => (
                          <motion.button
                            key={`${src}-${i}`}
                            ref={(el) => {
                              thumbRefs.current[i] = el
                            }}
                            type="button"
                            onClick={() => goTo(i, i > activeIndex ? 1 : i < activeIndex ? -1 : 0)}
                            animate={
                              reduced
                                ? undefined
                                : {
                                    opacity: i === activeIndex ? 1 : 0.7,
                                    scale: i === activeIndex ? 1.04 : 1,
                                  }
                            }
                            transition={{ duration: 0.22, ease: easeSmooth }}
                            className={`relative shrink-0 overflow-hidden rounded-sm border-2 transition-colors ${
                              i === activeIndex
                                ? 'border-accent ring-1 ring-accent/40'
                                : 'border-transparent hover:border-white/20 hover:opacity-100'
                            }`}
                            aria-label={m.projects.galleryPick
                              .replace('{n}', String(i + 1))
                              .replace('{total}', String(count))}
                            aria-current={i === activeIndex ? 'true' : undefined}
                          >
                            <img
                              src={src}
                              alt=""
                              width={120}
                              height={75}
                              className="h-14 w-auto max-w-[140px] object-cover sm:h-16 sm:max-w-[160px]"
                              loading="lazy"
                              decoding="async"
                            />
                          </motion.button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null

  return portal
}
