/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sinhala: ['"Noto Sans Sinhala"', "sans-serif"],
        display: ['"Abhaya Libre"', "serif"],
      },
      colors: {
        ink: {
          950: "#05080f",
          900: "#070c16",
          850: "#0a1220",
          800: "#0e1728",
          700: "#16223a",
          600: "#22334f",
        },
        lab: {
          teal: "#2dd4bf",
          lime: "#a3e635",
          amber: "#fbbf24",
        },
      },
      boxShadow: {
        panel: "0 24px 60px -24px rgba(0,0,0,0.75)",
      },
    },
  },
  plugins: [],
};
