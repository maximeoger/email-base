/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#17EC92",
        grey: {
          100: "#FFFFFF",
          200: "#F7F7FA",
          300: "#E0E0E5",
          400: "#A1A1B2",
          500: "#666680",
          600: "#474766",
          700: "#2E2E4D",
          800: "#1A1A33",
          900: "#0A0A1A",
        },
        mint: {
          100: "#F2FFFA",
          200: "#C7FFE7",
          300: "#B2FFDE",
          400: "#76F5C2",
          500: "#18ED98",
          600: "#13D085",
          700: "#0DB06F",
          800: "#077449",
          900: "#024128",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
