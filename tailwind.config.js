const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        blueGray: colors.blueGray,
        lime: colors.lime,
        primary: colors.emerald,
        violet: colors.violet,
      },
    },
    fontFamily: {
      serif: ["Arvo", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
