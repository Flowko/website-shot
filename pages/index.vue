<script setup lang="ts">
useHead({
  title: 'Home',
})

const isOpen = ref(false)
</script>

<template>
  <div>
    home

    <UButton @click="isOpen = true">
      settings
    </UButton>
  </div>
</template>
