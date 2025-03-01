/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0073aa', // WordPress blue as primary color
          dark: '#005177',
          light: '#00a0d2',
        },
        secondary: {
          DEFAULT: '#46b450', // WordPress green
          dark: '#328540',
          light: '#7ad03a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}