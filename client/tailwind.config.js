/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-red': '#42201A',
        white: '#e2d6cc',
        'rich-dark': '#221E1F',
        'deep-brown': '#332620',
        'dark-deep-brown': '#2A221D',
        'medium-tan': '#675C60',
        'light-tan': '#c4b982',
        'deep-purple': '#3F333A',
        orange: '#a17644',
        'light-deep-purple': '#675C60',
      },
      fontFamily: {
        heading: ['Bebas Neue Pro', 'Helvetica', 'Arial', 'sans-serif'],
        text: ['Popins', 'Arial', 'sans-serif'],
      },
      fontSize: {
        title: '1.875rem',
        'sub-title': '1.5rem',
        paragraph: '1rem',
        features: '0.875rem',
        'desktop-title': '2.25rem',
        'desktop-sub-title': '1.5rem',
        'desktop-paragraph': '1.125rem',
        'desktop-features': '1rem',
      },
    },
  },
  plugins: [],
}
