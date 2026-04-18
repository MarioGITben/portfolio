import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useRef, type MouseEvent, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollToHash } from '../hooks/useScrollToHash'

type Props = {
  href: string
  children: ReactNode
  className?: string
}

const MAX = 10

export function MagneticButton({ href, children, className = '' }: Props) {
  const reduced = useReducedMotion()
  const scrollTo = useScrollToHash()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.35 })
  const transform = useMotionTemplate`translate(${sx}px, ${sy}px)`

  const onMove = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (reduced || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      x.set(Math.max(-MAX, Math.min(MAX, dx * 0.12)))
      y.set(Math.max(-MAX, Math.min(MAX, dy * 0.12)))
    },
    [reduced, x, y],
  )

  const onLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        scrollTo(href)
      }
    },
    [href, scrollTo],
  )

  return (
    <motion.a
      ref={ref}
      href={href}
      style={reduced ? undefined : { transform }}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocus={onLeave}
      className={`relative inline-flex items-center justify-center rounded-card border border-accent px-8 py-3 font-sans text-sm font-medium tracking-wide text-accent transition-colors duration-300 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      {children}
    </motion.a>
  )
}
