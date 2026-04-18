import { useLenisInstance } from '../context/LenisContext'

const NAV_OFFSET = 88

export function useScrollToHash() {
  const lenis = useLenisInstance()

  return (hash: string) => {
    const el = document.querySelector(hash)
    if (!el) return

    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -NAV_OFFSET, lerp: 0.12 })
    } else {
      const top =
        el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
}
