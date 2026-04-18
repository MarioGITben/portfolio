import { motion } from 'framer-motion'

const layoutId = 'brand-logo'

const defaultImgClass =
  'h-9 w-auto max-h-[2.25rem] object-contain sm:h-10 sm:max-h-[2.5rem]'

type Props = {
  variant: 'portfolio' | 'resume'
  className?: string
  /** Overrides default navbar-sized image classes when set. */
  imgClassName?: string
  /**
   * When true (default), uses shared `layoutId` for FLIP morph between portfolio and résumé.
   * Set false for isolated uses (e.g. splash loader) so the logo does not animate toward the navbar.
   */
  sharedLayout?: boolean
}

/** Shared layoutId enables FLIP morph between portfolio and resume surfaces. */
export function BrandLogo({
  variant,
  className,
  imgClassName,
  sharedLayout = true,
}: Props) {
  const src = variant === 'portfolio' ? '/logo-portfolio.png' : '/logo-resume.png'
  return (
    <motion.div
      {...(sharedLayout ? { layoutId } : {})}
      className={className}
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
    >
      <img
        src={src}
        alt=""
        width={200}
        height={56}
        className={imgClassName ?? defaultImgClass}
        decoding="async"
      />
    </motion.div>
  )
}
