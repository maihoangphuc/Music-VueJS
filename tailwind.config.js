// tailwind.config.js
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      screens: {
        sm: "200px",
        md: "790px",
        lg: "980px",
        xl: "1110px",
      },
    },
  },
};
