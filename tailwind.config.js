/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#D3BFB1',
      },
    },
  },
  plugins: [],
}

