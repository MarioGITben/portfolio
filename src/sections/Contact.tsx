import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'
import { pick, useMessages } from '../hooks/useMessages'
import { ArrowUpRight, Facebook, Linkedin } from 'lucide-react'
import { contact } from '../data'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../hooks/useLanguage'
import { useToast } from '../hooks/useToast'
import { useReducedMotion } from '../hooks/useReducedMotion'
import emailjs from '@emailjs/browser'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** Lucide omits the Discord mark; single-path logo, inherits `currentColor`. */
function DiscordIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} aria-hidden>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  )
}

export function Contact() {
  const reduced = useReducedMotion()
  const { locale } = useLanguage()
  const { showToast } = useToast()
  const m = useMessages()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const ambientY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -48])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
    if (!publicKey || !serviceId || !templateId) {
      showToast(m.contact.toastNotConfigured)
      return
    }
    if (!name.trim() || !email.trim() || !message.trim() || !isValidEmail(email)) {
      showToast(m.contact.toastValidation)
      return
    }

    setSending(true)
    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name.trim(),
          from_email: email.trim(),
          message: message.trim(),
        },
        { publicKey },
      )
      if (result.status === 200) {
        showToast(m.contact.toastSuccess)
        setName('')
        setEmail('')
        setMessage('')
      } else {
        showToast(m.contact.toastError)
      }
    } catch {
      showToast(m.contact.toastError)
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden border-t border-divider bg-canvas px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <motion.div
        style={{ y: ambientY }}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[120vw] -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(3rem,12vw,9rem)] leading-none text-ink/[0.035]"
        aria-hidden
      >
        {pick(contact.ambient, locale)}
      </motion.div>

      <div className="relative z-[1] mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow={m.contact.eyebrow}
          title={m.contact.title}
          subtitle={pick(contact.intro, locale)}
        />
        <motion.form
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={onSubmit}
          className="mt-10 space-y-8"
        >
          <div>
            <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              {m.contact.name}
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder={m.contact.phName}
              className="w-full border-0 border-b border-white/[0.08] bg-transparent pb-3 font-sans text-ink placeholder:text-dim/70 focus:border-accent focus:outline-none focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              {m.contact.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder={m.contact.phEmail}
              className="w-full border-0 border-b border-white/[0.08] bg-transparent pb-3 font-sans text-ink placeholder:text-dim/70 focus:border-accent focus:outline-none focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              {m.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={m.contact.phMessage}
              rows={4}
              className="w-full resize-none border-0 border-b border-white/[0.08] bg-transparent pb-3 font-sans text-ink placeholder:text-dim/70 focus:border-accent focus:outline-none focus:ring-0"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            aria-busy={sending}
            className="inline-flex items-center gap-2 rounded-sm border border-accent/70 px-6 py-2.5 font-sans text-sm font-medium text-accent transition-colors hover:bg-accent/10 disabled:pointer-events-none disabled:opacity-50"
          >
            {sending ? m.contact.sending : m.contact.send}
            <ArrowUpRight className="size-4" aria-hidden />
          </button>
        </motion.form>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-14 flex flex-col items-center gap-8 border-t border-divider pt-10 sm:flex-row sm:justify-between"
        >
          <div className="flex justify-center gap-8 sm:justify-start">
            <a
              href={contact.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="text-dim transition-colors hover:text-accent"
              aria-label="Facebook"
            >
              <Facebook className="size-6" />
            </a>
            <a
              href={contact.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-dim transition-colors hover:text-accent"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-6" />
            </a>
            <a
              href={contact.social.discord}
              target="_blank"
              rel="noreferrer noopener"
              className="text-dim transition-colors hover:text-accent"
              aria-label="Discord"
            >
              <DiscordIcon className="size-6" />
            </a>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="font-mono text-sm text-dim transition-colors hover:text-accent"
          >
            {contact.email}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
