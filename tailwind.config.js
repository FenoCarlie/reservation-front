/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        northwell: ["Northwell", "sans-serif"],
        tnor: ["Tnor", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
      },
      colors: {
        "white-transparent-26": "rgba(255, 255, 255, 0.26)",
      },
      boxShadow: {
        "custom-shadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backdropFilter: {
        "custom-blur": "blur(19.5px)",
      },
    },
  },
  plugins: [],
};
