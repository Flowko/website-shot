
export function showToast(title: string, description: string, type: 'success' | 'error' | 'warning' | 'info' = 'success', icon: string = 'i-solar-check-read-line-duotone') {
  
  const toast = useToast()

  let color = 'primary'
  const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  switch (type) {
    case 'success':
      color = 'emerald'
      icon = 'i-solar-check-read-bold-duotone'
      break
    case 'error':
      color = 'red'
      icon = 'i-solar-xxx-bold-duotone'
      break
    case 'warning':
      color = 'amber'
      icon = 'i-solar-shield-warning-bold-duotone'
      break
    case 'info':
      color = 'blue'
      icon = 'i-solar-info-square-bold-duotone'
      break
  }

  
  toast.add({
    title,
    description,
    icon,
    color,
    id: randomId,
  })
}
