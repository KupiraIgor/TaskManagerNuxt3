export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['@/assets/scss/index.scss'],
  build: {
    transpile: ['vuetify'],
  },
})
