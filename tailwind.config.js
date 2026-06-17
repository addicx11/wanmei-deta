/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gardenia: '#F7E8B8',
        warmwhite: '#FFF8F0',
        teagreen: '#4F6A5E',
        wood: '#8B5A2B',
        paper: '#FDF5E6',
        ink: '#3B3024',
        blush: '#E8C4A2',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'Source Han Serif SC', 'SimSun', 'serif'],
        sans: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
