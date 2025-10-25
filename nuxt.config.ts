// nuxt.config.ts
export default defineNuxtConfig({
  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],

  build: {
    transpile: ["vuetify"],
  },

  app: {
    head: {
      title: "Matina Safaei 🌴",
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module"],

  vuetify: {
    theme: { defaultTheme: "light" },
    autoImport: true,
  },
})