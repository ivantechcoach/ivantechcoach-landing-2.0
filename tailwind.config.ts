import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
        },
        surface: {
          canvas: 'var(--bg)',
          secondary: 'var(--bg-2)',
          card: 'var(--card)',
          elevated: 'var(--card-elevated)',
        },
        telemetry: {
          emerald: 'var(--primary)',
          violet: 'var(--accent-violet)',
        },
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
      },
      transitionDuration: {
        fast: 'var(--anim-fast)',
        base: 'var(--anim-base)',
        slow: 'var(--anim-slow)',
      },
    },
  },
  plugins: [],
}
export default config
