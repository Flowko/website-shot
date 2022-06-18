const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
      "./public/index.html",
      "./public/**/*.html",
      "node_modules/tv-*/dist/tv-*.umd.min.js",
    ],
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        blueGray: colors.blueGray,
        lime: colors.lime,
        primary: colors.emerald,
        violet: colors.violet,
        text: "#363a52",
        border: "#ced4da",
        primary: {
          100: "#2189f3",
          200: "#1c7cdb",
        },
      },
    },
    fontFamily: {
      serif: ["Space Grotesk", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
