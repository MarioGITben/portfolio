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
            className="fixed bottom-8 left-1/2 z-[160] w-[min(90vw,22rem)] -translate-x-1/2 rounded-card border border-zinc-600/90 bg-zinc-950 px-4 py-3 text-center text-sm font-medium text-zinc-100 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)]"
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}
