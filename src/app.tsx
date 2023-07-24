import notifee, { EventType } from '@notifee/react-native'
import crashlytics from '@react-native-firebase/crashlytics'
import messaging from '@react-native-firebase/messaging'
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native'
import { useKeepAwake } from 'expo-keep-awake'
import React, { FC, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import RNToast, { ToastConfig } from 'react-native-toast-message'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChuckerButton, ErrorFallback, NetworkInfo, Toast } from './components'
import { StackNavigator, StackParams } from './navigator'
import {
  Notification,
  NotificationPressHandler,
  NotificationType,
} from './services/notification'
import { persistor, store } from './store'

enableScreens()

export const navigationContainerRef = createNavigationContainerRef<StackParams>()

const toastConfig: ToastConfig = {
  error: (props) => <Toast toastProps={props} type="error" />,
  success: (props) => <Toast toastProps={props} type="info" />,
}

const App: FC<JSX.Element> = () => {
  __DEV__ && useKeepAwake()

  useEffect(() => {
    /**
     * Platform: Android
     * Listen FCM message when the app is in foreground state
     *
     */
    return messaging().onMessage(async (message) => {
      console.log('onMessage:', JSON.stringify(message, null, 2))

      /**
       * Platform: Android
       * Manually display local notification based on FCM message.
       * Because when in foreground state the FCM message wouldn't show notification(s)
       *
       */
      await Notification.showNotification(message)
    })
  }, [])

  useEffect(() => {
    /**
     * Platform: Android
     * Called when FCM message notification is pressed when app is in background state
     *
     */
    messaging().onNotificationOpenedApp((message) => {
      console.log('onNotificationOpenedApp:', JSON.stringify(message, null, 2))

      if (!message || !message.data || !message.data.data) return
      const { type } = JSON.parse(message.data.data)

      NotificationPressHandler.navigateTo[type as NotificationType]()
    })

    /**
     * Platform: Android
     * Called when FCM message notification is pressed when app is in quit state
     *
     */
    messaging()
      .getInitialNotification()
      .then((message) => {
        console.log('getInitialNotification:', JSON.stringify(message, null, 2))

        if (!message || !message.data || !message.data.data) return
        const { type } = JSON.parse(message.data.data)

        NotificationPressHandler.navigateTo[type as NotificationType]()
      })
  }, [])

  useEffect(function onForegroundLocalNotificationShown() {
    /**
     * Platform: Android
     * Called when local notification made by 'onMessage' callback above
     * is pressed when app is in foreground state
     *
     */
    return notifee.onForegroundEvent(({ detail, type: eventType }) => {
      console.log('onForegroundEvent:', JSON.stringify(detail, null, 2))

      const { notification } = detail
      if (!notification || !notification.data || !notification.data.data) return
      const { type } = JSON.parse(notification.data.data as string)

      if (eventType === EventType.PRESS) {
        NotificationPressHandler.navigateTo[type as NotificationType]()
      }
    })
  }, [])

  const onError = (error: Error, info: { componentStack: string }) => {
    crashlytics().log('-------\nJS Error Caught by Error Boundary!')
    crashlytics().log(`error: ${JSON.stringify(error)}`)
    crashlytics().log(`info: ${JSON.stringify(info)}`)
    crashlytics().recordError(error)
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
              <NavigationContainer
                ref={navigationContainerRef}
                onStateChange={(state) => {
                  console.log('CURRENT SCREEN:', state?.routes[state.index].name)
                }}
              >
                <StackNavigator />
                <NetworkInfo />
                <RNToast config={toastConfig} />
                <ChuckerButton />
              </NavigationContainer>
            </ErrorBoundary>
          </PersistGate>
        </Provider>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}

export default App
