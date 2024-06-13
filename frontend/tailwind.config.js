/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0'},
          '100%': { opacity: '1'}
        }
      },
      backgroundImage: {
        'background': "url('./src/assets/backgroundImage.jpg')",
        'opacity': 0.2,
      },
    },
  },
  plugins: [
    function({addUtilities}){
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) white"
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px"
          },
          "&::-webkit-scrollbar-track": {
            // background: "white"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(197 201 206)",
            borderRadius: "20px",
            // border: "1px solid rgb(255 192 77)"
          },
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"]);
    }
  ],
}