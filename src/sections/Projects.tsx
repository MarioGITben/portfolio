import { motion } from 'framer-motion'
import { projects, type Project } from '../data'
import { SectionHeading } from '../components/SectionHeading'
import { TiltCard } from '../components/TiltCard'
import { useMessages } from '../hooks/useMessages'
import { useReducedMotion } from '../hooks/useReducedMotion'

const makeContainer = (reduced: boolean) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduced ? 0 : 0.08,
      delayChildren: reduced ? 0 : 0.04,
    },
  },
})

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function ProjectCardMedia({ project }: { project: Project }) {
  const src = project.images[0]
  if (!src) return null
  return (
    <img
      src={src}
      alt=""
      width={960}
      height={600}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full max-w-full"
    />
  )
}

export function Projects() {
  const reduced = useReducedMotion()
  const m = useMessages()
  const container = makeContainer(reduced)

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-divider bg-canvas px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={m.projects.eyebrow} title={m.projects.title} />

        {projects.length > 0 ? (
          <motion.div
            variants={container}
            initial={reduced ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-8%' }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-5"
          >
            {projects.map((project, index) => {
              const lastOdd = projects.length % 2 === 1 && index === projects.length - 1
              return (
                <motion.div
                  key={`${index}-${project.title.en}`}
                  variants={item}
                  className={
                    lastOdd
                      ? 'min-h-0 w-full md:col-span-2 md:mx-auto md:max-w-5xl'
                      : 'min-h-0 w-full'
                  }
                >
                  <TiltCard project={project}>
                    <ProjectCardMedia project={project} />
                  </TiltCard>
                </motion.div>
              )
            })}
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
