import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { ArrowUpRight, ImageIcon } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { pick, useMessages } from '../hooks/useMessages'
import type { Project } from '../data'
import { ProjectGalleryModal } from './ProjectGalleryModal'
import { TiltFrame } from './TiltFrame'

const easeSmooth = [0.22, 1, 0.36, 1] as const

type Props = {
  project: Project
  children: ReactNode
}

export function TiltCard({ project, children }: Props) {
  const { locale } = useLanguage()
  const m = useMessages()
  const [hovered, setHovered] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)

  const title = pick(project.title, locale)
  const blurb = pick(project.blurb, locale)
  const blurbHover = pick(project.blurbHover, locale)
  const liveUrl = project.live?.trim()

  const slideDur = 0.38

  return (
    <>
      <TiltFrame
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative w-full overflow-hidden rounded-card border border-white/[0.06] bg-surface/90 shadow-none outline outline-1 outline-offset-0 outline-white/15 transition-[border-color,box-shadow] duration-500 ease-smooth hover:z-10 hover:border-accent/35 hover:outline-2 hover:outline-accent/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(201,169,110,0.35)]"
      >
        <div className="relative w-full" style={{ transform: 'translateZ(0)' }}>
          <div className="relative w-full overflow-hidden [&>img]:block [&>img]:h-auto [&>img]:w-full [&>img]:max-w-full [&>img]:origin-center [&>img]:transition-transform [&>img]:duration-500 [&>img]:ease-smooth motion-safe:[&>img]:group-hover:scale-[1.08] motion-reduce:[&>img]:transition-none motion-reduce:[&>img]:group-hover:scale-100">
            {children}
          </div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas from-20% via-canvas/60 to-transparent"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.88 }}
            transition={{ duration: 0.45, ease: easeSmooth }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 pb-5 pt-28 md:p-6 md:pb-6 md:pt-32">
            <div className="pointer-events-auto flex flex-col gap-3">
              <div>
                <h3 className="font-display text-xl leading-snug text-ink drop-shadow-sm transition-colors duration-500 ease-smooth group-hover:text-accent md:text-[1.35rem]">
                  {title}
                </h3>
                <div className="relative mt-2 h-[4.25rem] overflow-hidden md:h-[4.5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={hovered ? 'hover' : 'base'}
                      initial={{ y: '100%', opacity: 1 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '-35%', opacity: 0 }}
                      transition={{ duration: slideDur, ease: easeSmooth }}
                      className="absolute inset-x-0 top-0 line-clamp-3 font-sans text-sm leading-relaxed text-dim drop-shadow-sm"
                    >
                      {hovered ? blurbHover : blurb}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-sm border border-white/[0.12] bg-canvas/35 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink/85 backdrop-blur-[2px]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-6 pt-0.5">
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="inline-flex items-center gap-2 font-mono text-xs text-ink/90 transition-colors hover:text-accent"
                >
                  <ImageIcon className="size-4 shrink-0" aria-hidden />
                  {m.links.view}
                </button>
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 font-mono text-xs text-ink/90 transition-colors hover:text-accent"
                  >
                    <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                    {m.links.live}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </TiltFrame>
      <ProjectGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={title}
        images={project.images}
      />
    </>
  )
}
