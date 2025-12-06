// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vesp/nuxt-fontawesome'],
  fontawesome: {
      // component: 'font-awesome',
      icons: {
         solid: ['chevron-down', "chevron-left", "chevron-right", 'plus', 'bars', 'times', "search", "chevron-up", "chevron-right", "play-circle", "pause-circle", "ellipsis-h", "ellipsis-v", "play", "check", 'check-circle'] // 👈 add here
      }
    }


})