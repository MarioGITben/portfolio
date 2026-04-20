import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { hero } from '../data'
import { MagneticButton } from '../components/MagneticButton'
import { Typewriter } from '../components/Typewriter'
import { useLanguage } from '../hooks/useLanguage'
import { useMessages } from '../hooks/useMessages'
import { pick } from '../hooks/useMessages'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Hero() {
  const reduced = useReducedMotion()
  const { locale } = useLanguage()
  const m = useMessages()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 72])
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spotlightSpring = { stiffness: 72, damping: 20, mass: 1.15 }
  const spx = useSpring(px, spotlightSpring)
  const spy = useSpring(py, spotlightSpring)
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)
  const pointerClientRef = useRef<{ x: number; y: number } | null>(null)
  const [pointerCapable, setPointerCapable] = useState(false)

  const roleStrings = useMemo(
    () => hero.roles.map((r) => pick(r, locale)),
    [locale],
  )

  const displayName = pick(hero.displayName, locale)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setPointerCapable(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const syncToLatestPointer = () => {
      if (!rectRef.current || !pointerClientRef.current) return
      const x = pointerClientRef.current.x - rectRef.current.left
      const y = pointerClientRef.current.y - rectRef.current.top
      px.set(Math.max(0, Math.min(rectRef.current.width, x)))
      py.set(Math.max(0, Math.min(rectRef.current.height, y)))
    }

    const updateRect = () => {
      rectRef.current = node.getBoundingClientRect()
      if (!rectRef.current) return
      if (pointerClientRef.current) {
        syncToLatestPointer()
      } else {
        // Initial resting position when there's no pointer interaction yet.
        px.set(rectRef.current.width * 0.5)
        py.set(rectRef.current.height * 0.38)
      }
    }

    updateRect()
    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, { passive: true })
    return () => {
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
    }
  }, [px, py])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced || !pointerCapable || !rectRef.current) return
      pointerClientRef.current = { x: e.clientX, y: e.clientY }
      pendingRef.current = {
        x: e.clientX - rectRef.current.left,
        y: e.clientY - rectRef.current.top,
      }

      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        if (!pendingRef.current || !rectRef.current) return
        const x = Math.max(0, Math.min(rectRef.current.width, pendingRef.current.x))
        const y = Math.max(0, Math.min(rectRef.current.height, pendingRef.current.y))
        px.set(x)
        py.set(y)
      })
    },
    [reduced, pointerCapable, px, py],
  )

  const onPointerEnter = useCallback(() => {
    if (!sectionRef.current) return
    rectRef.current = sectionRef.current.getBoundingClientRect()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100dvh] scroll-mt-24 flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <motion.div style={{ y: parallaxY }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-canvas" />
        {!reduced && pointerCapable ? (
          <motion.div
            aria-hidden
            className="absolute left-0 top-0 h-[750px] w-[750px] rounded-full"
            style={{
              x: spx,
              y: spy,
              translateX: '-50%',
              translateY: '-50%',
              background:
                'radial-gradient(circle, rgba(201, 169, 110, 0.16) 0%, rgba(201, 169, 110, 0.08) 34%, transparent 62%)',
              willChange: 'transform',
            }}
          />
        ) : (
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(520px circle at 50% 38%, rgba(201, 169, 110, 0.12), transparent 62%)',
            }}
          />
        )}
        <div className="noise-overlay" />
      </motion.div>

      <div className="relative z-[1] mx-auto w-full max-w-7xl pointer-events-auto">
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-tight text-ink"
        >
          {displayName}
        </motion.h1>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl"
        >
          <Typewriter key={locale} strings={roleStrings} />
        </motion.div>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <MagneticButton href={hero.ctaHref}>{m.hero.cta}</MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
