import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useCallback, useMemo, useRef } from 'react'
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
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const spotlightSpring = { stiffness: 72, damping: 20, mass: 1.15 }
  const smx = useSpring(mx, spotlightSpring)
  const smy = useSpring(my, spotlightSpring)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${smx}% ${smy}%, rgba(201, 169, 110, 0.16), transparent 62%)`

  const roleStrings = useMemo(
    () => hero.roles.map((r) => pick(r, locale)),
    [locale],
  )

  const displayName = pick(hero.displayName, locale)

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced || !sectionRef.current) return
      const r = sectionRef.current.getBoundingClientRect()
      const x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100
      const y = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100
      mx.set(x)
      my.set(y)
    },
    [reduced, mx, my],
  )

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100dvh] scroll-mt-24 flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <motion.div style={{ y: parallaxY }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-canvas" />
        {!reduced ? (
          <motion.div className="absolute inset-0" style={{ backgroundImage: spotlight }} />
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
