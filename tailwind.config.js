
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ['class'],
  theme:  {
    screens: {
      sm: '600px',
      md: '768px',
      lg: '900px',
      xl: '1150px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        kaushan: ['var(--font-kaushan)'],
      },
      colors: {
        primary: '#c026d3',
      },

      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },

        'half-slide-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },

        'half-slide-left': {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },

      animation: {
        fade: 'fade 0.5s ease-in-out alternate',
        'half-slide-right': 'half-slide-right 0.5s ease-in-out alternate',
        'half-slide-left': 'half-slide-left 0.5s ease-in-out alternate',
      }
    },
  },
  plugins: [],
}
