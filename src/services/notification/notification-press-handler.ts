import { navigationContainerRef } from '@/app'
import { NotificationType } from './types'

const navigateTo: Record<NotificationType, () => void> = {
  new_message: () => {
    navigationContainerRef.isReady() && navigationContainerRef.navigate('Profile')
  },
  news: () => {
    // Navigate to any screen you want here
  },
}

const NotificationPressHandler = { navigateTo }

export { NotificationPressHandler }
