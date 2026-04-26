/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#065F46",
        secondary: "#FFFFFF",
        accent: "#10B981",
        background: "#FFFFFF",
        text: {
          primary: "#111827",
          secondary: "#4B5563",
        }
      },
      fontFamily: {
        primary: ["Playfair Display", "serif"],
        secondary: ["Plus Jakarta Sans", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
