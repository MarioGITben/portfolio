/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** EmailJS public key (dashboard → Account → API keys). Not a server secret; restrict usage by domain in EmailJS. */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
