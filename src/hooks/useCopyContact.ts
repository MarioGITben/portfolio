import { useCallback } from 'react'
import { useToast } from './useToast'
import { useMessages } from './useMessages'

export function phoneDigitsForCopy(raw: string) {
  return raw.replace(/[\s().-]/g, '')
}

export function useCopyContact() {
  const { showToast } = useToast()
  const m = useMessages()

  const copy = useCallback(
    (kind: 'email' | 'phone', text: string) => {
      void navigator.clipboard.writeText(text).then(() => {
        showToast(kind === 'email' ? m.contact.copiedEmail : m.contact.copiedPhone)
      })
    },
    [showToast, m.contact.copiedEmail, m.contact.copiedPhone],
  )

  return { copy }
}
