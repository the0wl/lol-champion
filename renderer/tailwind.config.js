const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./renderer/**/*.tsx'],
  theme: {
    colors: {
      'primary': '#0c181e',
      'secondary': '#8e7b00',
      'secondary-dark': '#0e000f',
      'white': '#ffffff',
      'black': '#000000',
      'danger': '#fc2605',
      'gray-dark': '#212021'
    },
    fontFamily: {
      primary: ['DM Sans', 'sans-serif']
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};
