import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  strings: readonly string[]
  className?: string
}

export function Typewriter({ strings, className = '' }: Props) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % strings.length)
    }, 3400)
    return () => window.clearInterval(id)
  }, [reduced, strings.length])

  const text = strings[reduced ? 0 : index]

  return (
    <p className={`inline-flex min-h-[1.5em] items-center font-sans text-lg text-dim md:text-xl ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-baseline gap-1"
        >
          <span>{text}</span>
          <span
            className="inline-block h-[1.1em] w-px translate-y-0.5 bg-accent/80 motion-safe:animate-pulse"
            aria-hidden
          />
        </motion.span>
      </AnimatePresence>
    </p>
  )
}
