// https://nuxt.com/docs/api/configuration/nuxt-config
import process from "node:process";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@vesp/nuxt-fontawesome"],

  runtimeConfig: {
    public: {
      apiBase: "",
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
