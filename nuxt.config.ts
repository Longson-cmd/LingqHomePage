// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vesp/nuxt-fontawesome'],
  fontawesome: {
      // component: 'font-awesome',
      icons: {
         solid: ['chevron-down', 'plus', 'bars', 'times', "search", ] // 👈 add here
      }
    }


})