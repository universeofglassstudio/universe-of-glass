/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        baseDark: '#000000',
        eleganceGrey: '#3A3A3A',
        warmCream: '#FFF1CC',
        glassGreen: '#a0a85a',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      }
    }
  }
}
