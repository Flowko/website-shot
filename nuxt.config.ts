// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/devtools',
    'nuxt-icon',
    '@nuxthq/ui',
    'nuxt-headlessui',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
  ],

  typescript: {
    shim: false,
  },

  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'octicon'],
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },

  tailwindcss: {
    viewer: false,
  },

})
