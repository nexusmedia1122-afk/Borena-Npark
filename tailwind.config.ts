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
        /* Primary — Deep Institutional Forest Green */
        forest: {
          950: '#091910',
          900: '#11281B',
          850: '#173423',
          800: '#1E422D',
          700: '#29573D',
          600: '#387050',
          500: '#4A8C66',
          400: '#69A683',
          300: '#94C3A9',
          200: '#C2DFD0',
          100: '#E2ECE5',
          50: '#F1F6F3',
        },
        /* Accent — Muted Savanna Acacia Gold */
        gold: {
          700: '#8E6B18',
          600: '#B88B22',
          500: '#C99B2D',
          400: '#DDB24A',
          300: '#E9C874',
          200: '#F4DEA3',
          100: '#F7EFCF',
          50: '#FCF9EC',
        },
        /* Secondary — Volcanic Rift Terracotta & Caldera Clay */
        earth: {
          900: '#522413',
          800: '#6D341D',
          700: '#853F23',
          600: '#9E4F2E',
          500: '#B8623D',
          400: '#CF7D5A',
          300: '#E2A083',
          200: '#F0C7B3',
          100: '#F6E7DE',
          50: '#FCF7F4',
        },
        /* Editorial Charcoal Typography */
        charcoal: {
          950: '#0E100D',
          900: '#161815',
          800: '#252824',
          700: '#3D423B',
          600: '#585E55',
          500: '#747A70',
          400: '#949A90',
        },
        /* Sun-Bleached Sand Grounds */
        sand: {
          400: '#D1C29B',
          300: '#DFD3B8',
          200: '#ECE3CD',
          100: '#F5EFE0',
          50: '#FAF6ED',
        },
        /* Warm Canvas */
        ivory: {
          50: '#FAF8F5',
          100: '#F3ECE1',
          200: '#E8DECF',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.2em',
        'wider-editorial': '0.12em',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(14, 16, 13, 0.05), 0 1px 4px -1px rgba(14, 16, 13, 0.03)',
        'card': '0 8px 24px -4px rgba(14, 16, 13, 0.08), 0 2px 6px -2px rgba(14, 16, 13, 0.04)',
        'luxury': '0 20px 48px -12px rgba(9, 25, 16, 0.14)',
        'elevated': '0 24px 64px -16px rgba(9, 25, 16, 0.2)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'kenburns': 'kenburns 24s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
}