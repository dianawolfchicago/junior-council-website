import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'jc-red': '#C8102E',
        'jc-red-dark': '#A00C24',
        'jc-red-light': '#E8102E',
        'jc-black': '#0A0A0A',
        'jc-charcoal': '#1A1A1A',
        'jc-gray': '#F7F7F7',
        'jc-gray-mid': '#E0E0E0',
        'jc-gray-dark': '#555555',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
export default config
