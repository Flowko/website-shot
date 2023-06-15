// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/devtools',
    'nuxt-icon',
    '@nuxthq/ui',
    'nuxt-headlessui',
    '@vueuse/nuxt',
  ],

  typescript: {
    shim: false,
  },

  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'octicon'],
  },

})
