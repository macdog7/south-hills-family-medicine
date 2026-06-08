/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'warm-gray': '#5C5C5C',
        'egshell': '#FDFBF8',
        'brand': {
          500: '#6183A6',
          700: '#3D5A80',
          800: '#2B4158',
        },
        'accent': {
          blue: '#5B8FA8',
          green: '#7D9B76',
        },
      },
    },
  },
  plugins: [],
};
