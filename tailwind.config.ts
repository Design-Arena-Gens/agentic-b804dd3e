import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#eaf0ff',
          200: '#d9e2ff',
          300: '#b8c8ff',
          400: '#8ea6ff',
          500: '#5d7eff',
          600: '#395dff',
          700: '#2747e6',
          800: '#1e38b4',
          900: '#1d3591'
        }
      }
    },
  },
  plugins: [],
}

export default config
