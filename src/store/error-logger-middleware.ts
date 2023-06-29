import { isRejectedWithValue } from '@reduxjs/toolkit'
import Toast from 'react-native-toast-message'
import { Middleware, MiddlewareAPI } from 'redux'

const errorLoggerMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log('errorLoggerMiddleware() action:', JSON.stringify(action, null, 2))
    console.log('errorLoggerMiddleware() api:', JSON.stringify(api, null, 2))

    const { message } = action?.payload?.data
    Toast.show({
      text1: message || 'Error logger middleware caught error, but no error message',
      type: 'error',
    })
  }

  return next(action)
}

export { errorLoggerMiddleware }
