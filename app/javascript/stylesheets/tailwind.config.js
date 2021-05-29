const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      blue: {
        200: '#20f0ff',
        300: '#0CC5D2',
        400: '#00B7C4',
        500: '#005960',
        600: '#001e20',
      },
      green: colors.green,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-hamburgers')
  ],
}
