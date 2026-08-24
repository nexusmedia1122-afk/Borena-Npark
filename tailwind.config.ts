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
        /* Primary — Deep Acacia Savanna Forest */
        forest: {
          950: '#0A1D13',
          900: '#142C1D',
          800: '#1E3F2B',
          700: '#2A543B',
          600: '#386D4E',
          500: '#478662',
          400: '#68A381',
          300: '#94C3A9',
          200: '#C2DFD0',
          100: '#E4F1E9',
          50: '#F2F8F4',
        },
        /* Accent — Burnished Ethiopian Acacia Gold */
        gold: {
          700: '#9E781B',
          600: '#C59B27',
          500: '#D8AF3B',
          400: '#E4C261',
          300: '#EFD58D',
          200: '#F6E6B9',
          100: '#FAF2DC',
          50: '#FDFBF4',
        },
        /* Secondary — Volcanic Rift Terracotta & Caldera Clay */
        earth: {
          900: '#582613',
          800: '#73351C',
          700: '#8C4326',
          600: '#AA5836',
          500: '#C26F4A',
          400: '#D68C69',
          300: '#E6AE93',
          200: '#F2D0BF',
          100: '#F9EAE1',
          50: '#FCF5F0',
        },
        /* Warm Neutral Grounds — Sun-Bleached Linen & Rift Sand */
        charcoal: {
          950: '#0E100D',
          900: '#161815',
          800: '#262925',
          700: '#3D413B',
          600: '#575C54',
          500: '#73786F',
        },
        sand: {
          400: '#D5C49F',
          300: '#E4D6B6',
          200: '#EFE4CD',
          100: '#F6EFE0',
          50: '#FAF6ED',
        },
        ivory: {
          50: '#FAF7F0',
          100: '#F4EDE1',
          200: '#E9DFD0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.22em',
        'wider-editorial': '0.15em',
      },
      boxShadow: {
        'luxury': '0 24px 60px -15px rgba(10, 29, 19, 0.16)',
        'luxury-hover': '0 32px 70px -15px rgba(10, 29, 19, 0.22)',
        'card': '0 12px 36px -10px rgba(14, 16, 13, 0.12)',
        'glow-gold': '0 12px 36px -8px rgba(197, 155, 39, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'kenburns': 'kenburns 28s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}