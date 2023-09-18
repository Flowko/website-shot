<script setup lang="ts">

</script>

<template>
  <div class="flex grow flex-col overflow-hidden transition-all duration-150">
    <div class="relative flex grow flex-col overflow-y-auto">
      <div
        class="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-6 border-b bg-background  border-white/5  px-4 shadow-sm sm:px-6 lg:px-8"
      >
        <button type="button" class="-m-2.5 p-2.5 md:hidden">
          <UIcon name="i-solar-hamburger-menu-line-duotone" class="h-6 w-6" aria-hidden="true" />
        </button>

        <div class="flex flex-1 justify-end items-center gap-2">
          <LayoutColorPicker />
          <LayoutThemeSwitcher />
        </div>
      </div>
      <div class="grow  pt-[3.5rem] md:pt-[4rem]">
        <div class="h-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
