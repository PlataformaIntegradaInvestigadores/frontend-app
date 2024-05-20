/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {

      colors: {
        primary:'#172554'
      },

      /* colors: {
        primary:'#fe2c55'
      } */


    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
