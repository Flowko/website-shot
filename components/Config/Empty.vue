<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

useHead({
  title: 'Home',
})


const schema = z.object({
  name: z.string({
    required_error: 'Config name is required',
  }).nonempty('Config name can\'t be empty'),
})

type Schema = z.output<typeof schema>

const state = ref({
  name: undefined,
})
const createConfigModal = ref(false)


async function submit(event: FormSubmitEvent<Schema>) {
  
  
  if (event.data) {
    const { data, error } = await useFetch('/api/config', {
      method: 'POST',
      body: JSON.stringify(event.data),
    })

    if (error.value) {
      await showToast(
        'Create config failed',
        'An error occurred while creating your config',
        'error',
      )
      console.error(error.value.message)
      return
    }
    
    await showToast(
      'Config created',
      'Your config has been created successfully',
    )
    close()
  }
}

function close() {
  createConfigModal.value = false
}
</script>

<template>
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

  <UModal v-model="createConfigModal">
    <UForm
      :schema="schema"
      :state="state"
      @submit="submit"
    >
      <UCard
        :ui="{
          ring: '',
          divide: '',
          footer: {
            base: 'p-4 flex justify-end space-x-2',
          },
          body: {
            padding: 'px-4 py-0 sm:p-0 sm:px-6',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Create new config
            </h3>

            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="close" />
          </div>
        </template>
        <div class="flex flex-col gap-y-2">
          <p class="text-sm text-gray-400">
            Add a new config to your app.
          </p>
          <UFormGroup name="name">
            <UInput v-model="state.name" type="text" size="md" placeholder="config name" />
          </UFormGroup>
        </div>
        <template #footer>
          <UButton color="gray" @click="close">
            Cancel
          </UButton>
          <UButton type="submit" color="black">
            Create
          </UButton>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>

<style scoped>

</style>
