export const useAppNotification = () => {
  const notifications = useState('app-notifications', () => [])
  const nextId = useState('app-notifications-next-id', () => 1)

  const dismissNotification = (id) => {
    notifications.value = notifications.value.filter((item) => item.id !== id)
  }

  const notify = ({ type = 'info', message = '', duration = 3500 } = {}) => {
    if (!message) return

    const id = nextId.value++
    notifications.value = [...notifications.value, { id, type, message }]

    if (duration > 0 && process.client) {
      window.setTimeout(() => dismissNotification(id), duration)
    }
  }

  const notifySuccess = (message, duration) => {
    notify({ type: 'success', message, duration })
  }

  const notifyError = (message, duration) => {
    notify({ type: 'error', message, duration })
  }

  return {
    notifications,
    dismissNotification,
    notify,
    notifySuccess,
    notifyError
  }
}
