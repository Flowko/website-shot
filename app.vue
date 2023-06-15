<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#18181b' : 'white')

useHead({
  titleTemplate: title => title && title.includes('Website Shot') ? title : `${title} - Website Shot`,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: 'antialiased font-sans text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 ',
  },
})
</script>

<template>
  <NuxtPage />
</template>
