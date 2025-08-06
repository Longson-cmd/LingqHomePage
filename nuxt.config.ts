// https://nuxt.com/docs/api/configuration/nuxt-config

import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css',
    '@vueform/slider/themes/default.css' 
  ],
  
  modules: ['@nuxtjs/tailwindcss'],

    vite: {
    plugins: [svgLoader()]
  }

})
