module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
