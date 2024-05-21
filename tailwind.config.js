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
        myPrimary:'#172554'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
