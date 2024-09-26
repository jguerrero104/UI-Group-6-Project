/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#6a0dad',
        'custom-pink': '#ff69b4',
        'custom-teal': '#20c997',
      }
    },
  },
  plugins: [],
}

