<script setup lang="ts">
const { configs, createConfigModal, getConfigs } = useConfig()

await getConfigs()
</script>

<template>
  <div class="hidden md:flex md:flex-row">
    <div class="h-screen-fix no-scrollbar bg-palette-0 flex">
      <nav class="drag border-foreground z-40 flex flex-col justify-between border-r-[0.5px] bg-transparent py-4">
        <div class="px-4 flex gap-y-4 flex-col justify-center items-center">
          <UButton
            icon="i-solar-home-smile-angle-linear" to="/" variant="outline" :ui="{
              rounded: 'rounded-full',
              variant: {
                outline: 'ring-2 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
              },
            }" size="xl"
          />

          <div v-if="configs && configs.length" class="flex flex-col items-center justify-center">
            <UButton
              v-for="config in configs"
              :key="config.id"
              :label="config.name.slice(0, 2)"
              color="black"
              :to="`/config/${config.id}`" variant="link" size="md"
            />
          </div>

          <hr class="border-foreground w-full">

          <UButton
            icon="i-heroicons-plus-solid" color="gray" size="md"
            @click="createConfigModal = true"
          />
        </div>

        <div class="flex w-20 flex-col items-center space-y-5 bg-transparent px-5 pb-5">
          bottom
        </div>
      </nav>
    </div>
    <ConfigModalCreate />
  </div>
</template>

<style scoped>

</style>
