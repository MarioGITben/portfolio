import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
function sleep(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms))
}

export type TerminalSkillLine = {
  category: string
  line: string
}

type Props = {
  windowTitle: string
  prompt: string
  groups: TerminalSkillLine[]
}

export function TerminalBlock({ windowTitle, prompt, groups }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [promptDone, setPromptDone] = useState('')
  const [completedCount, setCompletedCount] = useState(0)
  const [currentLine, setCurrentLine] = useState('')
  const [phase, setPhase] = useState<'prompt' | 'lines' | 'done'>('prompt')

  useEffect(() => {
    if (!inView) return

    let cancelled = false

    async function run() {
      if (reduced) {
        setPromptDone(prompt)
        setPhase('done')
        setCompletedCount(groups.length)
        setCurrentLine('')
        return
      }

      setPromptDone('')
      setCompletedCount(0)
      setCurrentLine('')
      setPhase('prompt')

      for (let i = 1; i <= prompt.length; i++) {
        if (cancelled) return
        setPromptDone(prompt.slice(0, i))
        await sleep(32)
      }
      await sleep(180)
      setPhase('lines')

      for (let gi = 0; gi < groups.length; gi++) {
        if (cancelled) return
        const g = groups[gi]
        const full = `${g.category}: ${g.line}`
        setCurrentLine('')
        for (let c = 1; c <= full.length; c++) {
          if (cancelled) return
          setCurrentLine(full.slice(0, c))
          await sleep(16)
        }
        setCompletedCount((n) => n + 1)
        setCurrentLine('')
        await sleep(100)
      }

      setPhase('done')
      setCurrentLine('')
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [inView, reduced, prompt, groups])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-card border border-white/[0.06] bg-[#0d0d0d] font-mono text-sm leading-relaxed shadow-inner"
    >
      <div className="flex items-center gap-3 border-b border-white/[0.05] px-4 py-2.5 md:px-5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/[0.12]" />
          <span className="size-2.5 rounded-full bg-white/[0.12]" />
          <span className="size-2.5 rounded-full bg-white/[0.12]" />
        </span>
        <p className="flex-1 text-center text-[11px] text-dim md:text-xs">{windowTitle}</p>
      </div>

      <div className="space-y-3 p-5 text-[13px] md:p-6 md:text-sm">
        <p className="whitespace-pre-wrap">
          <span className="font-semibold text-accent">&gt;</span>{' '}
          <span className="text-dim">{promptDone}</span>
          {phase === 'prompt' && promptDone.length < prompt.length ? (
            <span className="text-accent motion-safe:animate-pulse">▍</span>
          ) : null}
        </p>

        {(phase === 'lines' || phase === 'done') && (
          <div className="space-y-3 border-t border-white/[0.05] pt-4">
            {groups.slice(0, completedCount).map((g) => (
              <p key={g.category} className="leading-relaxed">
                <span className="font-medium text-accent">{g.category}:</span>{' '}
                <span className="text-ink/90">{g.line}</span>
              </p>
            ))}
            {phase === 'lines' && currentLine ? (
              <p className="text-dim">
                {currentLine}
                <span className="text-accent motion-safe:animate-pulse">▍</span>
              </p>
            ) : null}
            {phase === 'done' ? (
              <p className="pt-1 text-dim">
                <span className="font-semibold text-accent">&gt;</span>{' '}
                <span className="text-accent motion-safe:animate-pulse">▍</span>
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
