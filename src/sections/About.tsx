import { motion } from 'framer-motion'
import { about } from '../data'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../hooks/useLanguage'
import { useMessages } from '../hooks/useMessages'
import { pick } from '../hooks/useMessages'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function About() {
  const reduced = useReducedMotion()
  const { locale } = useLanguage()
  const m = useMessages()

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-divider bg-elevated px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={m.about.eyebrow} title={m.about.title} />
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-md lg:mx-0"
          >
            <div className="overflow-hidden rounded-card border border-accent/35 bg-muted shadow-inner">
              <div className="relative">
                <img
                  src={about.portrait}
                  alt=""
                  width={640}
                  height={800}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover opacity-95"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/85 via-canvas/15 to-transparent" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {about.bio.map((p, i) => (
              <p key={i} className="font-sans text-base leading-relaxed text-dim md:text-lg">
                {pick(p, locale)}
              </p>
            ))}
            <ul className="flex flex-wrap gap-2 pt-2">
              {about.chips.map((c, i) => (
                <li
                  key={i}
                  className="rounded-sm border border-white/10 bg-surface/90 px-3 py-1.5 font-sans text-xs text-ink/90"
                >
                  {pick(c, locale)}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
