import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BrandLogo } from './BrandLogo'
import { useReducedMotion } from '../hooks/useReducedMotion'

const MIN_VISIBLE_MS = 520
const FONT_WAIT_MS = 3200

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

function waitForWindowLoad(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', () => resolve(), { once: true })
  })
}

async function waitForSiteReady(): Promise<void> {
  const started = performance.now()
  const fonts =
    'fonts' in document
      ? Promise.race([document.fonts.ready, sleep(FONT_WAIT_MS)]).catch(() => {})
      : Promise.resolve()
  await Promise.all([waitForWindowLoad(), fonts])
  const elapsed = performance.now() - started
  if (elapsed < MIN_VISIBLE_MS) await sleep(MIN_VISIBLE_MS - elapsed)
}

export function SiteLoader() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      await waitForSiteReady()
      if (!cancelled) setVisible(false)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const exitDuration = reduced ? 0.12 : 0.55

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = ''
      }}
    >
      {visible ? (
        <motion.div
          key="site-loader"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading site"
          className="fixed inset-0 z-[180] flex flex-col items-center justify-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: exitDuration, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="noise-overlay" aria-hidden />
          <div className="relative z-[1] flex flex-col items-center gap-8 px-6">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: reduced ? 0.01 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BrandLogo
                variant="portfolio"
                sharedLayout={false}
                imgClassName="h-14 w-auto max-h-[3.5rem] object-contain sm:h-[4.25rem] sm:max-h-[4.25rem]"
              />
            </motion.div>
            <div className="relative h-px w-[min(12rem,70vw)] overflow-hidden bg-muted">
              {reduced ? (
                <div
                  className="absolute inset-y-0 left-0 w-2/5 bg-accent"
                  aria-hidden
                />
              ) : (
                <motion.div
                  className="absolute inset-y-0 left-0 w-2/5 bg-accent"
                  aria-hidden
                  initial={{ x: '-100%' }}
                  animate={{ x: '350%' }}
                  transition={{
                    duration: 1.25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
