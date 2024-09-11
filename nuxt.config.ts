// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'vuetify/lib/styles/main.sass',
    '@/assets/scss/index.scss',
    '@mdi/font/css/materialdesignicons.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],
  ],

  imports: {
    dirs: ['./stores'],
  },
})
