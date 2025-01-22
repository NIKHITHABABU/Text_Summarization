/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'one': ['FredokaOne', 'sans-serif'],
        'circular': ['Circular Black', 'sans-serif'],
        'skyer': ['skyer-400', 'sans-serif'],
      },
    },
  },
  plugins: [],
}