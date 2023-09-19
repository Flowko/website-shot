export default defineAppConfig({
  ui: {
    primary: 'emerald',
    gray: 'zinc',
  },
  elements: {
    variables: {
      light: {
        background: '255 255 255',
        foreground: 'var(--color-gray-300)',
      },
      dark: {
        background: 'var(--color-gray-900)',
        foreground: 'var(--color-gray-800)',
      },
    },
  },
})
