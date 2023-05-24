/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    screens: {
      xs: '320px',
    },
    extend: {
      ringColor: '#7259FD',
      colors: {
        primary: '#7259FD',
        secondary: '#826AF8',
        main: '#181820',
        main100: '#1d1d26',
        black100: '#21212B',
        black200: '#272732',
        black300: '#2A2B3F',
        grayMain: '#A4A4D9',
        gray: '#C9CBD1',
        darkGray: '#52526B',
      },
      fontFamily: {
        sans: ['Inter var'],
      },
      animation: {
        'spin-slow': 'spin 9s linear infinite',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#7259FD',
          'primary-focus': '#634ce0',
          secondary: '#826AF8',
          'secondary-focus': '#5343a1',
          accent: '#1FB2A6',
          neutral: '#21212B',
          'base-100': '#181820',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#E0957B',
          error: '#F87272',
        },
      },
      'light',
    ],
  },
  plugins: [
    require('daisyui'),
    require('prettier-plugin-tailwindcss'),
    require("tailwindcss-animate"),
  ],
}
