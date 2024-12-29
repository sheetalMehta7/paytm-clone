/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarySolid: '#6739B7',
        primaryGradient: 'linear-gradient(135deg, #6739B7, #9A7EC9)',
        secondary1: '#E5C453',
        secondary2: '#E57255',
        secondary3: '#46BDBF',
        black1: '#121212',
        black2: '#1A1A1A',
        white1: '#FCFCFC',
        white2: '#F5F5F5',
        positive: '#52D273',
        negative: '#E95065',
      },
    },
  },
  plugins: [],
}
