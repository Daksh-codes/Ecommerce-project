/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      bg: '#FFFFFA',
      secondary: '#0D2C54',
      accent : '#EC9A29',
      bd : '#0D2C54', 
      gray : colors.slate,
      black : colors.black
    },
      

    boxShadow : {
      mac:  'rgba(0, 0, 0, 0.3) 20px 20px 200px 200px',
      mac2:  'rgba(0, 0, 0, 0.3) 10px 10px 200px 200px',
      stripe : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    },
    fontFamily: {
      Robotic : ["Press Start 2P", "cursive"],
     },
    extend: {},
  },
  plugins: [],
}

