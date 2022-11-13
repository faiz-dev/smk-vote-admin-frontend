/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: '#009ef7',
        primary: '#009ef7',
        "primary-active": '#0095e8',
        success: '#50cd89',
        "success-active": '#47be7d',
        info: '#7239ea',
        "info-active": '#5014d0',
        warning: '#ffc700',
        "warning-active": '#f1bc00',
        danger: '#f1416c',
        "danger-active": '#d9214e',
        dark: '#131628',
        "dark-active": '#181C32'
      },
      fontSize: {
        menu: '10pt'
      }
    },
  },
  plugins: [],
}
