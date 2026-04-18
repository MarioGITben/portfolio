import Lenis from 'lenis'
import { useEffect, useState, type ReactNode } from 'react'
import { LenisContext } from '../context/LenisContext'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) {
      queueMicrotask(() => setLenis(null))
      return
    }

    const instance = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      allowNestedScroll: true,
    })
    queueMicrotask(() => setLenis(instance))

    let raf = 0
    const tick = (time: number) => {
      instance.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      queueMicrotask(() => setLenis(null))
    }
  }, [reduced])

  return <LenisContext.Provider value={reduced ? null : lenis}>{children}</LenisContext.Provider>
}
