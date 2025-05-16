/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#cce3ff',
          200: '#99c8ff',
          300: '#66acff',
          400: '#3391ff',
          500: '#0066ff', // Primary color
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        dark: {
          100: '#f7f7f7',
          200: '#e6e6e6',
          300: '#d1d1d1',
          400: '#b0b0b0',
          500: '#888888',
          600: '#6a6a6a',  
          700: '#444444',
          800: '#262626',
          900: '#121212',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}