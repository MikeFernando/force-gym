/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        GREEN_700: '#00875F',
        GREEN_500: '#00B37E',
    
        RED: '#F75A68',
        RED_DARK: '#AA2834',
    
        GRAY_700: '#121214',
        GRAY_600: '#202024',
        GRAY_500: '#29292E',
        GRAY_400: '#323238',
        GRAY_300: '#7C7C8A',
        GRAY_200: '#C4C4CC',
        GRAY_100: '#E1E1E6',
  
        BLUE_400: '#3f3f95',
        BLUE_500: '#2176ff',
        BLUE_900: '#000058',
  
        WHITE: '#FFFFFF'
      },
    },
  },
  plugins: [],
}

