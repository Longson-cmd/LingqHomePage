// https://nuxt.com/docs/api/configuration/nuxt-config
import process from "node:process";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@vesp/nuxt-fontawesome"],

  runtimeConfig: {
    apiProxyBase: process.env.NUXT_API_PROXY_BASE || process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000",
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000',
    },
  },

  fontawesome: {
    icons: {
      solid: [
        "chevron-down",
        "chevron-left",
        "chevron-right",
        "plus",
        "minus",
        "bars",
        "times",
        "search",
        "chevron-up",
        "play-circle",
        "pause-circle",
        "ellipsis-h",
        "ellipsis-v",
        "play",
        "check",
        "check-circle",
      ],
    },
  },
});
