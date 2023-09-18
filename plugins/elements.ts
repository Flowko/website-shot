export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const head = nuxtApp.vueApp._context.provides.usehead

  const root = computed(() => {
    return `:root {
  
    ${Object.entries(appConfig.elements.variables.light).map(([key, value]) => `--element-${key}: ${value};`).join('\n')}
  }
  
  .dark {
    ${Object.entries(appConfig.elements.variables.dark).map(([key, value]) => `--element-${key}: ${value};`).join('\n')}
  }`
  })

  // Head
  const headData: any = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: 'nuxt-elements-variables',
    }],
  }

  // SPA mode
  if (process.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    const style = document.createElement('style')

    style.innerHTML = root.value
    style.setAttribute('data-nuxt-elements-variables', '')
    document.head.appendChild(style)

    headData.script = [{
      innerHTML: 'document.head.removeChild(document.querySelector(\'[data-nuxt-elements-variables]\'))',
    }]
  }

  // Workaround for https://github.com/nuxt/nuxt/issues/22763
  head.push(headData)
})
