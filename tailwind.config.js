module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        logo: "6rem",
      },
      colors: {
        zippia: {
          primary: "#2c2c2c",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
