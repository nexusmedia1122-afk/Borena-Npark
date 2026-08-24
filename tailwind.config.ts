/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/admin/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Primary — Deep Forest Green */
        forest: {
          950: '#0F1F16',
          900: '#1B3527',
          800: '#234531',
          700: '#2E5740',
          600: '#38684C',
          500: '#45805D',
          400: '#6BA07C',
          300: '#9CC2A8',
          200: '#C9DFCF',
          100: '#E7F1EA',
          50: '#F3F8F4',
        },
        /* Accent — Savanna Gold */
        gold: {
          700: '#96741F',
          600: '#B8912F',
          500: '#C9A44E',
          400: '#D4BA6A',
          300: '#E4CE93',
          200: '#F1E3BC',
          100: '#F9F1DC',
        },
        /* Secondary — Earth Terracotta */
        earth: {
          800: '#6E4527',
          700: '#8A5A3B',
          600: '#A06A42',
          500: '#B07A4F',
          300: '#D4A882',
          100: '#F3E6DA',
        },
        /* Warm neutrals */
        charcoal: { 900: '#191A17', 800: '#2C2E29', 700: '#40433C' },
        sand: { 300: '#DECDA4', 200: '#E9DAB6', 100: '#F5ECD8' },
        ivory: { 50: '#FAF6EE', 100: '#F0EAD8' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 24px 48px -16px rgba(25, 26, 23, 0.18)',
        'card': '0 12px 32px -12px rgba(25, 26, 23, 0.14)',
        'glow-gold': '0 10px 30px -10px rgba(184, 145, 47, 0.45)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'kenburns': 'kenburns 24s ease-out forwards',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}