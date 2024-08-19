/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EEEEEE', // Whitesmoke
        secondary: '#373A40', // dark
        primary_b: '#DC5F00', // orange
        secondary_b: '#686D76', // grey
      },
    },
  },
  plugins: [
  ],
}
