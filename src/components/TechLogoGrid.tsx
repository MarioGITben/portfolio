import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  siClaude,
  siCursor,
  siDocker,
  siHostinger,
  siInertia,
  siLaravel,
  siLinux,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from 'simple-icons'
import type { TechStackItem } from '../data'
import { useLanguage } from '../hooks/useLanguage'
import { useMessages } from '../hooks/useMessages'
import { useReducedMotion } from '../hooks/useReducedMotion'

const MAP: Record<TechStackItem['id'], SimpleIcon> = {
  react: siReact,
  typescript: siTypescript,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  docker: siDocker,
  tailwindcss: siTailwindcss,
  linux: siLinux,
  vercel: siVercel,
  laravel: siLaravel,
  php: siPhp,
  mysql: siMysql,
  inertia: siInertia,
  hostinger: siHostinger,
  cursor: siCursor,
  claude: siClaude,
}

/** Expo-out style — long glide, no bounce */
const slideEase = [0.16, 1, 0.3, 1] as const

const slideTransition = {
  duration: 0.62,
  ease: slideEase,
} as const

function TechIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="size-8 md:size-9"
      aria-hidden
      fill={`#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  )
}

function TechStackCell({
  item,
  index,
  reduced,
  experienceUnit,
  srExperience,
}: {
  item: TechStackItem
  index: number
  reduced: boolean
  experienceUnit: string
  srExperience: string
}) {
  const [pointerIn, setPointerIn] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const revealed = pointerIn || focusWithin
  const icon = MAP[item.id]

  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative pt-2.5"
        onPointerEnter={() => setPointerIn(true)}
        onPointerLeave={() => setPointerIn(false)}
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={(e) => {
          const next = e.relatedTarget as Node | null
          if (next && e.currentTarget.contains(next)) return
          setFocusWithin(false)
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-2 top-3 bottom-0 z-0 rounded-card border border-white/[0.04] bg-surface/40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-1 top-1.5 bottom-0 z-[1] rounded-card border border-white/[0.05] bg-surface/65"
        />
        <div
          tabIndex={0}
          aria-label={`${icon.title}. ${srExperience}`}
          className="relative z-10 overflow-hidden rounded-card border border-white/[0.06] bg-surface/90 shadow-none outline-none ring-accent transition-[border-color,box-shadow] duration-500 ease-smooth hover:border-accent/30 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          {reduced ? (
            <div
              aria-hidden
              className="flex aspect-square flex-col items-center justify-center gap-2 p-4"
            >
              <span title={icon.title}>
                <TechIcon icon={icon} />
              </span>
              <span className="text-center font-mono text-xs tabular-nums text-dim">
                {item.years}+ {experienceUnit}
              </span>
            </div>
          ) : (
            <div aria-hidden className="aspect-square overflow-hidden">
              <motion.div
                className="flex h-[200%] flex-col will-change-transform"
                animate={{ y: revealed ? '-50%' : '0%' }}
                transition={slideTransition}
              >
                <div className="flex h-1/2 flex-col items-center justify-center p-4">
                  <span title={icon.title}>
                    <TechIcon icon={icon} />
                  </span>
                </div>
                <div className="flex h-1/2 flex-col items-center justify-center gap-0.5 border-t border-white/[0.06] bg-muted/25 p-3">
                  <span className="font-mono text-2xl font-medium tabular-nums tracking-tight text-ink md:text-[1.65rem]">
                    {item.years}+
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    {experienceUnit}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.li>
  )
}

type Props = {
  items: readonly TechStackItem[]
}

export function TechLogoGrid({ items }: Props) {
  const reduced = useReducedMotion()
  const { locale } = useLanguage()
  const m = useMessages()

  return (
    <ul className="grid grid-cols-3 gap-4 md:gap-5">
      {items.map((item, i) => {
        const icon = MAP[item.id]
        const srExperience =
          locale === 'tl'
            ? `${item.years} o higit pang taon gamit ang ${icon.title}`
            : `${item.years}+ years of experience with ${icon.title}`

        return (
          <TechStackCell
            key={item.id}
            item={item}
            index={i}
            reduced={reduced}
            experienceUnit={m.skills.experienceUnit}
            srExperience={srExperience}
          />
        )
      })}
    </ul>
  )
}
