/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/*.{html,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

