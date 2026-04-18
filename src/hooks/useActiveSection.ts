import { useCallback, useEffect, useRef, useState } from 'react'
import { useLenisInstance } from '../context/LenisContext'

const SECTION_IDS = ['about', 'projects', 'skills', 'awards', 'contact'] as const

export type NavSection = (typeof SECTION_IDS)[number]

/**
 * Viewport Y from top: a section counts as “current” once its top edge is at or above this line.
 * Matches `scroll-mt-24` (96px) + fixed header so nav state lines up with in-page scroll targets.
 */
const ACTIVATION_TOP_PX = 104

export function useActiveSection() {
  const lenis = useLenisInstance()
  const [active, setActive] = useState<NavSection | null>(null)
  const rafRef = useRef(0)

  const compute = useCallback(() => {
    let current: NavSection | null = null
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const top = el.getBoundingClientRect().top
      if (top <= ACTIVATION_TOP_PX) {
        current = id
      }
    }
    setActive(current)
  }, [])

  const schedule = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(compute)
  }, [compute])

  useEffect(() => {
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    const unsubLenis = lenis?.on('scroll', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      unsubLenis?.()
      cancelAnimationFrame(rafRef.current)
    }
  }, [lenis, schedule])

  return active
}
