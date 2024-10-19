/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Blue: 'var(--primary)',
        Red: 'var(--secondary)',
        Black: 'var(--black)',
        White: 'var(--white)',
        Green_blue: 'var(--green-blue)',
        Light_blue: 'var(--light-blue)',
        Lighter_blue: 'var(--lighter-blue)',
        Star: 'var(--yellow)',
        Dark_blue: 'var(--dark-blue)',
        Gray: 'var(--gray)',
        Light_gray: 'var(--light-gray)',
        Lighter_gray: 'var(--lighter-gray)',
      }
    },
  },
  plugins: [],
}

