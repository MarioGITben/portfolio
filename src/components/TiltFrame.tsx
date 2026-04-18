import { motion, useMotionTemplate, useSpring } from 'framer-motion'
import { useCallback, useRef, type MouseEvent, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** Max degrees at edges — higher = more sensitive to pointer position */
const TILT_X = 26
const TILT_Y = 26

const tiltSpring = {
  stiffness: 42,
  damping: 22,
  mass: 0.85,
} as const

type Props = {
  children: ReactNode
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function TiltFrame({ children, className = '', onMouseEnter, onMouseLeave }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const rotateX = useSpring(0, tiltSpring)
  const rotateY = useSpring(0, tiltSpring)
  const transform = useMotionTemplate`perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (reduced || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      rotateY.set(px * TILT_X)
      rotateX.set(-py * TILT_Y)
    },
    [reduced, rotateX, rotateY],
  )

  const reset = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.article
      ref={ref}
      style={reduced ? undefined : { transform, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        reset()
        onMouseLeave?.()
      }}
      className={`motion-reduce:transform-none ${className}`.trim()}
    >
      {children}
    </motion.article>
  )
}
