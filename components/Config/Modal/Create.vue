<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { createConfigModal, getConfigs } = useConfig()
const schema = z.object({
  name: z.string({
    required_error: 'Config name is required',
  }).nonempty('Config name can\'t be empty'),
})

type Schema = z.output<typeof schema>

const state = ref({
  name: undefined,
})

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

    if (data.value && data.value.id) {
      await showToast(
        'Config created',
        'Your config has been created successfully',
      )
      close()
      await getConfigs()
    }
  }
}
</script>

<template>
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

            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="createConfigModal = false" />
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
          <UButton color="gray" @click="createConfigModal = false">
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
