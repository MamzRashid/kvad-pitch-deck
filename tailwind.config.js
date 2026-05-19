/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        kvad: {
          bg: '#030303',
          surface: '#0c0c0c',
          card: '#111111',
          border: '#1a1a1a',
          'border-light': '#222222',
          dim: '#888888',
          muted: '#555555',
          faint: '#333333',
        },
      },
      letterSpacing: {
        'super': '0.3em',
        'wide-plus': '0.15em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'wave': 'wave 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}
