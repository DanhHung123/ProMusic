/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0e1726',
        darkDeep: '#060818',
        darkBlur: '#20273c',
        gradientBlue: '#49C5F6',
        gradientPink: '#FF2AEF'
      },
      keyframes: {
        vertical: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' }
        },
        horizontal: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        horizontalRevert: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        vertical: 'vertical 0.5s ease-in-out 1 forwards',
        horizontal: 'horizontal 0.5s ease-in-out 1 forwards',
        horizontalRevert: 'horizontalRevert 0.5s ease-in-out 1 forwards'
      }
    },
    fontFamily: {
      primary: ['Readex Pro', 'sans-serif']
    }
  },
  plugins: []
}
