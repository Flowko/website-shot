<script setup lang="ts">

</script>

<template>
  <div class="flex grow flex-col overflow-hidden transition-all duration-150">
    <div class="relative flex grow flex-col overflow-y-auto">
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
