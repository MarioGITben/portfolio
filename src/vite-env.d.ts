/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Make.com custom webhook URL for contact form submissions. */
  readonly VITE_MAKE_WEBHOOK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
