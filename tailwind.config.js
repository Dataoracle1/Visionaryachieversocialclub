/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vasc-navy': '#2E3B8E',      // Main navy blue from logo
        'vasc-blue': '#3949AB',       // Lighter blue variant
        'vasc-orange': '#F39C12',     // Orange/gold from logo
        'vasc-gold': '#FFB946',       // Lighter gold
        'vasc-dark': '#1a2456',       // Darker navy
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}