import { motion } from 'framer-motion'
import type { WipeState } from './wipeTypes'

const ease = [0.22, 1, 0.36, 1] as const
const duration = 0.48

type Props = {
  wipe: Exclude<WipeState, 'idle'>
  onCoverComplete: () => void
  onRevealComplete: () => void
}

function topInitial(wipe: Exclude<WipeState, 'idle'>) {
  if (wipe === 'toResume-cover' || wipe === 'toPortfolio-cover') return { y: '-100%' }
  return { y: '0%' }
}

function topAnimate(wipe: Exclude<WipeState, 'idle'>) {
  if (wipe === 'toResume-cover' || wipe === 'toPortfolio-cover') return { y: '0%' }
  return { y: '-100%' }
}

function bottomInitial(wipe: Exclude<WipeState, 'idle'>) {
  if (wipe === 'toResume-cover' || wipe === 'toPortfolio-cover') return { y: '100%' }
  return { y: '0%' }
}

function bottomAnimate(wipe: Exclude<WipeState, 'idle'>) {
  if (wipe === 'toResume-cover' || wipe === 'toPortfolio-cover') return { y: '0%' }
  return { y: '100%' }
}

/** White wipe when returning to portfolio; dark canvas wipe when opening résumé (light). */
function panelClassNames(wipe: Exclude<WipeState, 'idle'>) {
  const toPortfolio = wipe.startsWith('toPortfolio')
  if (toPortfolio) {
    return {
      top: 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]',
      bottom: 'bg-white shadow-[0_-1px_0_rgba(0,0,0,0.06)]',
    }
  }
  return {
    top: 'bg-canvas shadow-[0_1px_0_rgba(255,255,255,0.04)]',
    bottom: 'bg-canvas shadow-[0_-1px_0_rgba(255,255,255,0.04)]',
  }
}

/**
 * Split wipe: top and bottom halves slide in, meet at the center, then split apart.
 * Only the top panel drives segment callbacks so each phase completes once.
 */
export function SplitWipeOverlay({ wipe, onCoverComplete, onRevealComplete }: Props) {
  const isCover = wipe.endsWith('cover')
  const panels = panelClassNames(wipe)

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
      aria-hidden
    >
      <motion.div
        key={`top-${wipe}`}
        className={`absolute left-0 right-0 top-0 h-1/2 ${panels.top}`}
        initial={topInitial(wipe)}
        animate={topAnimate(wipe)}
        transition={{ duration, ease }}
        onAnimationComplete={() => {
          if (isCover) onCoverComplete()
          else onRevealComplete()
        }}
      />
      <motion.div
        key={`bottom-${wipe}`}
        className={`absolute bottom-0 left-0 right-0 h-1/2 ${panels.bottom}`}
        initial={bottomInitial(wipe)}
        animate={bottomAnimate(wipe)}
        transition={{ duration, ease }}
      />
    </div>
  )
}
