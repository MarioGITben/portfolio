import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Navbar } from './components/Navbar'
import { SiteLoader } from './components/SiteLoader'
import { Footer } from './components/Footer'
import { SimpleResume } from './components/SimpleResume'
import { SplitWipeOverlay } from './components/SplitWipeOverlay'
import type { WipeState } from './components/wipeTypes'
import { site } from './data'
import { useLanguage } from './hooks/useLanguage'
import { useReducedMotion } from './hooks/useReducedMotion'
import { pick } from './hooks/useMessages'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Awards } from './sections/Awards'

export default function App() {
  const { locale } = useLanguage()
  const reduced = useReducedMotion()
  /** Default dark mode = portfolio (closed). Light mode = résumé (open). */
  const [resumeOpen, setResumeOpen] = useState(false)
  const [wipe, setWipe] = useState<WipeState>('idle')
  const wipeRef = useRef(wipe)
  wipeRef.current = wipe

  useEffect(() => {
    document.title = pick(site.title, locale)
    document.documentElement.lang = locale === 'tl' ? 'tl' : 'en'
  }, [locale])

  useEffect(() => {
    if (wipe !== 'idle' || resumeOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [wipe, resumeOpen])

  const openResume = useCallback(() => {
    if (wipe !== 'idle') return
    if (reduced) {
      setResumeOpen(true)
      return
    }
    setWipe('toResume-cover')
  }, [wipe, reduced])

  const closeResume = useCallback(() => {
    if (wipe !== 'idle') return
    if (reduced) {
      setResumeOpen(false)
      return
    }
    setWipe('toPortfolio-cover')
  }, [wipe, reduced])

  const onCoverComplete = useCallback(() => {
    const w = wipeRef.current
    if (w === 'toResume-cover') {
      setResumeOpen(true)
      setWipe('toResume-reveal')
    } else if (w === 'toPortfolio-cover') {
      setResumeOpen(false)
      setWipe('toPortfolio-reveal')
    }
  }, [])

  const onRevealComplete = useCallback(() => {
    setWipe('idle')
  }, [])

  return (
    <LayoutGroup>
      <SiteLoader />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-canvas focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar resumeOpen={resumeOpen} onLightMode={openResume} />
      <main id="main" className={resumeOpen ? 'hidden' : undefined} aria-hidden={resumeOpen}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <Footer className={resumeOpen ? 'hidden' : undefined} />
      <AnimatePresence>
        {resumeOpen ? (
          <SimpleResume key="simple-resume" onClose={closeResume} />
        ) : null}
      </AnimatePresence>
      {wipe !== 'idle' ? (
        <SplitWipeOverlay
          key={wipe}
          wipe={wipe}
          onCoverComplete={onCoverComplete}
          onRevealComplete={onRevealComplete}
        />
      ) : null}
    </LayoutGroup>
  )
}
