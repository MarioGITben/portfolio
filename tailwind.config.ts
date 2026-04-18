import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        elevated: 'var(--color-elevated)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        ink: 'var(--color-ink)',
        dim: 'var(--color-dim)',
        accent: 'var(--color-accent)',
        terminal: 'var(--color-terminal)',
        divider: 'var(--section-divider)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        sm: '6px',
      },
      boxShadow: {
        lift: '0 12px 40px rgba(0, 0, 0, 0.35)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
