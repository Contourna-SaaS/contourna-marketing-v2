/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Switzer, system-ui, sans-serif',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        "c-yellow": "#FDB913",
        'c-brown': "#37300E"
      }
    },
  },
  plugins: [],
}
