/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens for the luxury booking brand.
        // Overridden/extended in src/styles.scss via CSS variables.
      }
    }
  },
  plugins: []
};
