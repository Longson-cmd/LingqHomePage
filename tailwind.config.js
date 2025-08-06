/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './app.vue',
  ],
  theme: {
    extend: {
      screens: {
        mdlg:'890px',
        mdxl:'1082px',
        md2xl1:'1380px',
        md2xl2:'1700px', 
      }
    },
  },
  plugins: [],
}

