<script setup lang="ts">
useHead({
  title: 'Home',
})

const isOpen = ref(false)

const links = [{
  label: 'Profile',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4',
  },
  badge: 100,
}, {
  label: 'Installation',
  icon: 'i-heroicons-home',
  to: '/getting-started/installation',
}, {
  label: 'Vertical Navigation',
  icon: 'i-heroicons-chart-bar',
  to: '/navigation/vertical-navigation',
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  to: '/navigation/command-palette',
}]
</script>

<template>
  <div>
    home

    <UButton @click="isOpen = true">
      settings
    </UButton>

    <UModal v-model="isOpen" :ui="{ base: 'relative text-left sm:my-8 w-full flex flex-col sm:max-w-7xl h-small-screen sm:h-[calc(100vh-12rem)] bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow-xl' }">
      <div class="flex flex-col flex-1 min-h-0 overflow-y-auto divide-y u-divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x lg:overflow-hidden">
        <HeadlessTabGroup vertical>
          <HeadlessTabList class="flex-shrink-0 px-4 py-4 lg:col-span-3 lg:overflow-y-auto">
            <div class="flex items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-3 px-2">
                <span class="font-medium u-text-gray-900">Settings</span>
              </div><button class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center -my-1 lg:hidden" type="button">
                <UIcon name="i-octicon-x-24" class=" flex-shrink-0 h-4 w-4" />
              </button>
            </div>
            <HeadlessTab>Tab 1</HeadlessTab>
            <HeadlessTab>Tab 2</HeadlessTab>
            <HeadlessTab>Tab 3</HeadlessTab>
          </HeadlessTabList>
          <HeadlessTabPanels class="flex flex-col min-h-0 lg:col-span-9">
            <HeadlessTabPanel>Content 1</HeadlessTabPanel>
            <HeadlessTabPanel>Content 2</HeadlessTabPanel>
            <HeadlessTabPanel>Content 3</HeadlessTabPanel>
          </HeadlessTabPanels>
        </HeadlessTabGroup>
      </div>
    </UModal>
  </div>
</template>
