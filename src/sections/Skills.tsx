import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { skills } from '../data'
import { SectionHeading } from '../components/SectionHeading'
import { TerminalBlock } from '../components/TerminalBlock'
import { TechLogoGrid } from '../components/TechLogoGrid'
import { useLanguage } from '../hooks/useLanguage'
import { useMessages } from '../hooks/useMessages'
import { pick } from '../hooks/useMessages'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Skills() {
  const reduced = useReducedMotion()
  const { locale } = useLanguage()
  const m = useMessages()

  const terminalGroups = useMemo(
    () =>
      skills.groups.map((g) => ({
        category: pick(g.category, locale),
        line: pick(g.line, locale),
      })),
    [locale],
  )

  const windowTitle = pick(skills.terminalWindowTitle, locale)

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-divider bg-elevated px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={m.skills.eyebrow} title={m.skills.title} />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <TerminalBlock
              key={locale}
              windowTitle={windowTitle}
              prompt={skills.prompt}
              groups={terminalGroups}
            />
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
              {m.skills.stackLabel}
            </p>
            <TechLogoGrid items={skills.stack} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
