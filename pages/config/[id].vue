<script setup lang="ts">
const { configId, config, getConfig } = await useConfig()

const route = useRoute()
if (route.params.id) {
  configId.value = Number(route.params.id)
  await getConfig()
}
</script>

<template>
  <UContainer>
    <div v-if="config">
      Name: {{ config.name }}
    </div>
  </UContainer>
</template>

<style scoped>

</style>
