/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary_tailwind: '#1E3C8B',
        secondary: '#eaebed'
      },
      maxHeight: {
        '100': '580px', // Agrega la clase max-h-100 con un valor de 400px
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
