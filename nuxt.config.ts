// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/devtools',
    'nuxt-icon',
    '@nuxt/ui',
    'nuxt-headlessui',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
  ],

  typescript: {
    shim: false,
  },

  components: {
    dirs: [
      '~/components/',
    ],
  },

  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'octicon', 'solar'],
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
