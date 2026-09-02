// nuxt.config.ts

// Runs before first paint so the correct theme is on <html> immediately and
// there is no flash of the wrong palette.
//
// Dark is the brand default: it matches the fintech positioning and the trading
// demo. A visitor's explicit choice via the header toggle is remembered and
// always wins. (Swap the fallback for a prefers-color-scheme check if you'd
// rather follow the visitor's OS setting instead.)
const themeScript = `
(function(){try{
  var s=localStorage.getItem('ms-theme');
  var t=(s==='light'||s==='dark')?s:'dark';
  document.documentElement.dataset.theme=t;
  document.documentElement.style.colorScheme=t;
}catch(e){document.documentElement.dataset.theme='dark';}})();
`.trim()

export default defineNuxtConfig({
  css: [
    "@fontsource-variable/inter",
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.css",
    "~/assets/css/tokens.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  app: {
    head: {
      title: "Matina Safaei — Fintech Dashboards & Real-Time Data",
      htmlAttrs: { lang: "en", "data-theme": "dark" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Frontend engineer specialising in fintech dashboards and real-time data visualization with Vue.js, Nuxt and TypeScript.",
        },
        { name: "theme-color", content: "#0b1120" },
      ],
      script: [{ innerHTML: themeScript, tagPosition: "head" }],
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module"],

  runtimeConfig: {
    feedbackApiKey: process.env.FEEDBACK_API_KEY,
    feedbackToEmail: process.env.FEEDBACK_TO_EMAIL,
    feedbackFromEmail: process.env.FEEDBACK_FROM_EMAIL,

    public: {
      // Set NUXT_PUBLIC_CALENDLY_URL to your booking link and the "Book a call"
      // button appears as the primary contact CTA. Left empty, it stays hidden
      // rather than rendering a button that goes nowhere.
      calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL || "",
    },
  },

  vuetify: {
    // NOTE: this module reads Vuetify config from `vuetifyOptions`. The previous
    // top-level `theme` key here was silently ignored.
    vuetifyOptions: {
      theme: {
        defaultTheme: "portfolioDark",
        themes: {
          portfolioLight: {
            dark: false,
            colors: {
              background: "#fdf6f0",
              surface: "#fffaf5",
              primary: "#7b440d",
              secondary: "#b57f3d",
              error: "#a92318",
              success: "#1a6f2b",
              warning: "#8a5a00",
              "on-background": "#2b1c11",
              "on-surface": "#2b1c11",
              "on-primary": "#fff8f2",
            },
          },
          portfolioDark: {
            dark: true,
            colors: {
              background: "#0b1120",
              surface: "#141b2d",
              primary: "#f59e0b",
              secondary: "#fbbf24",
              error: "#f87171",
              success: "#34d17d",
              warning: "#fbbf24",
              "on-background": "#f1f5f9",
              "on-surface": "#f1f5f9",
              "on-primary": "#0b1120",
            },
          },
        },
      },
    },
  },
})
