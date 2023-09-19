<script setup lang="ts">
const { createConfigModal, configs } = useConfig()
useHead({
  title: 'Home',
})
</script>

<template>
  <div class="">
    <UIcon name="i-solar-box-line-duotone" class="mx-auto h-14 w-14" />
    <h3 class="mt-2 text-sm font-semibold">
      No configs yet
    </h3>
    <p class="mt-1 text-sm">
      Get started by creating a new config.
    </p>
    <div class="mt-6">
      <UButton label="Create Config" icon="i-heroicons-plus-solid" size="md" color="black" variant="solid" @click="createConfigModal = true" />
    </div>
  </div>
</template>

<style scoped>

</style>
