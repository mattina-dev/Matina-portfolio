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

  runtimeConfig: {
    feedbackApiKey: process.env.FEEDBACK_API_KEY,
    feedbackToEmail: process.env.FEEDBACK_TO_EMAIL,
    feedbackFromEmail: process.env.FEEDBACK_FROM_EMAIL,
  },

  vuetify: {
    theme: { defaultTheme: "light" },
    autoImport: true,
  },
})