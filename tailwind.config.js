/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        11: "50px",
      },
    },
  },
  plugins: [],
};
