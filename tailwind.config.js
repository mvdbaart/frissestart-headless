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
          DEFAULT: '#ff9800', // Main color orange
          dark: '#e68a00',
          light: '#ffad33',
        },
        secondary: {
          DEFAULT: '#2fb28d', // Secondary color green
          dark: '#259073',
          light: '#4dcfaa',
        },
        text: {
          dark: '#1e1f20', // Text color dark for light background
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