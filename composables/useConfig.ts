import type { Config } from '@prisma/client'

export function useConfig() {
  const configId = useState<number>('configId')
  const config = useState<Config>('config')
  const configs = useState<Config[]>('configs')
  const loading = useState('loading')
  const createConfigModal = useState<boolean>('createConfigModal')

  async function getConfigs() {
    const { data, error, pending } = await useFetch<Config[]>('/api/config/all', {
      server: true,
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    if (pending.value) {
      loading.value = true
      return
    }

    if (data.value) {
      configs.value = data.value
      loading.value = false
    }
  }

  async function getConfig() {
    const { data, error, pending } = await useFetch<Config>(`/api/config/${configId.value}`, {
      server: true,
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    if (pending.value) {
      loading.value = true
      return
    }

    if (data.value) {
      config.value = data.value
      loading.value = false
    }
  }

  return {
    config,
    loading,
    configId,
    configs,
    createConfigModal,
    getConfig,
    getConfigs,
  }
}
