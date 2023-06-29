import notifee, { AndroidChannel, AndroidImportance } from '@notifee/react-native'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

const channelId = 'default' as const
const notificationSound = 'default' as const
const channelConfig: AndroidChannel = {
  id: channelId,
  name: 'Default notification channel name',
  description: 'Default notification channel description',
  sound: notificationSound,
  importance: AndroidImportance.DEFAULT,
}

const showNotification = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  const { data } = message
  if (!data) return

  const { body, title } = data

  await notifee.displayNotification({
    title,
    body,
    data,
    ios: {
      sound: notificationSound,
      foregroundPresentationOptions: {
        banner: true,
        list: true,
        badge: true,
        sound: true,
      },
    },
    android: {
      channelId,
      importance: AndroidImportance.DEFAULT,
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
      showTimestamp: true,
      sound: notificationSound,
    },
  })
}

const Notification = { channelConfig, showNotification }

export { Notification }
