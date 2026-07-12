import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#080808',
          raised: '#0f0f0f',
          card: '#161616'
        },
        line: '#262626',
        accent: {
          DEFAULT: '#F97316',
          hover: '#FF8534',
          dark: '#C2410C'
        },
        ink: {
          heading: '#ffffff',
          body: '#A1A1AA',
          muted: '#71717a',
          subtle: '#52525b',
          faint: '#3f3f46'
        }
      },
      fontFamily: {
        display: ['var(--font-syne)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-jakarta)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular']
      },
      transitionTimingFunction: {
        enter: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};

export default config;
