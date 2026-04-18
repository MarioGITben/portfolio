import { motion } from 'framer-motion'

const layoutId = 'brand-logo'

type Props = {
  variant: 'portfolio' | 'resume'
  className?: string
}

/** Shared layoutId enables FLIP morph between portfolio and resume surfaces. */
export function BrandLogo({ variant, className }: Props) {
  const src = variant === 'portfolio' ? '/logo-portfolio.png' : '/logo-resume.png'
  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
    >
      <img
        src={src}
        alt=""
        width={200}
        height={56}
        className="h-9 w-auto max-h-[2.25rem] object-contain sm:h-10 sm:max-h-[2.5rem]"
        decoding="async"
      />
    </motion.div>
  )
}
