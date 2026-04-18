import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageProvider'
import { ToastProvider } from './context/ToastProvider'
import { SmoothScroll } from './providers/SmoothScroll'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
      <LanguageProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LanguageProvider>
    </SmoothScroll>
  </StrictMode>,
)
