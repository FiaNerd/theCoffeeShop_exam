/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-red': '#42201A',
        dark: '#221E1F',
        brown: '#332620',
        'dark-brown': '#2A221D',
        'medium-brown': '#675C60',
        'light-brown': '#8D7869',
        purple: '#3F333A',
        'light-purple': '#675C60',
      },
      fontFamily: {
        heading: ['Bebas Neue Pro',  'Helvetica'],
        text: ['Popins', 'Arial', 'sans-serif'],

      },
      fontSize: {
        'size-title': '1.875rem',
        'size-sub-title': '1.25rem',
        'size-paragraph': '1rem',
        'size-feautures': '0.875rem',
        'size-desktop-title': '2.25rem',
        'size-desktop-sub-title': '1.5rem',
        'size-desktop-paragraph': '1.125rem',
        'size-desktop-feautures': '1rem',
      },
    },
  },
  plugins: [],
}
