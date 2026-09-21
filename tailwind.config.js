/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        darkBg: '#1A0C05', // warm deep orange tone
        orangeBg: '#231007',
        carrotOrange: '#FF6418',
        carrotAmber: '#FFA526',
        carrotGreen: '#22C55E',
        accentText: '#FFF1EB',
        creamWhite: '#FAF7F2',
      },
      borderRadius: {
        '40': '40px',
        '50': '50px',
        '60': '60px',
      }
    },
  },
  plugins: [],
}
