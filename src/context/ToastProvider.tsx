import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContext } from './toast-context'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    window.setTimeout(() => setMessage(null), 3200)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {message ? (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
            className="fixed bottom-8 left-1/2 z-[100] w-[min(90vw,22rem)] -translate-x-1/2 rounded-card border border-accent/40 bg-elevated/95 px-4 py-3 text-center text-sm text-ink shadow-lift backdrop-blur-md"
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}
