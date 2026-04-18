import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  eyebrow?: string
  title: string
  /** Secondary line under the title (e.g. contact intro) */
  subtitle?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, subtitle, className = '' }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 md:mb-14 ${className}`}
    >
      {eyebrow ? (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          — {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-dim">{subtitle}</p>
      ) : null}
    </motion.div>
  )
}
