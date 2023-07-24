import notifee from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import { AppRegistry, Platform } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { startNetworkLogging } from 'react-native-network-logger'
import { name as appName } from './app.json'
import App from './src/app'
import { Notification } from './src/services/notification'
import { dispatchStore } from './src/store'
import { authActions } from './src/store/slices'

// FCM
async function askNotificationPermission() {
  const permissionStatus = await messaging().requestPermission()
  const isGranted =
    permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    permissionStatus === messaging.AuthorizationStatus.PROVISIONAL
  console.log('Permission Status:', permissionStatus, 'Granted:', isGranted)
}

// FCM
async function retrieveMessagingToken() {
  const token = await messaging().getToken()
  console.log(Platform.OS, 'messaging().getToken():', token)
  dispatchStore(authActions.setFCMToken(token))
  console.log(Platform.OS, 'FCM token:', token)
}

// FCM
askNotificationPermission()
  .then(() => {
    retrieveMessagingToken()
  })
  .then(() => {
    // Notifee
    // Platform: Android
    notifee.createChannel(Notification.channelConfig)
  })

messaging().setBackgroundMessageHandler(async (message) => {
  console.log('setBackgroundMessageHandler:', JSON.stringify(message, null, 2))
})

startNetworkLogging()
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App))
