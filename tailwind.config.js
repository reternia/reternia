/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cocogoose', 'sans-serif'],
        serif: ['Cocogoose', 'sans-serif'],
      },
      colors: {
        slate: {
          850: '#151e2e',
          900: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}
