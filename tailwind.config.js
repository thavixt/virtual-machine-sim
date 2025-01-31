/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        't-color1': 'whitesmoke',
        't-color2': '#C83E4D',
        't-color3': '#F4B860',
        't-color4': '#32373B',
        't-color5': '#F4D6CC',
        't-color5': '#4A5859',
      }
    },
  },
  plugins: [],
}

// current: https://coolors.co/32373b-4a5859-f4d6cc-f4b860-c83e4d
