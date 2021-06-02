const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.blue,
      teal: {
        figma: '#00B7C4',
        lightest: '#00A2AD',
        lighter: '#00818A',
        backup: '#006D75',
        readable: '#005F66',
        darker: '#004852',
        darkest: '#003D42'
      },
      green: colors.green,
    },
    extend: {
      skew: {
        '18': '-18deg',
      },
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))',
      }
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
