/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          lt: '#e2c97e',
          dk: '#9a7230',
          glow: 'rgba(201,168,76,0.22)',
        },
        bg: {
          DEFAULT: '#080d1a',
          2: '#0c1220',
          3: '#060b16',
          card: 'rgba(255,255,255,0.03)',
        },
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        blink: 'blink 0.9s infinite',
        orbitDot: 'orbitDot 12s linear infinite',
        rotateRing: 'rotateRing 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulseGold: 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        blink: {
          '0%,100%': { opacity: '0.1' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201,168,76,0)' },
        },
      },
    },
  },
  plugins: [],
}
