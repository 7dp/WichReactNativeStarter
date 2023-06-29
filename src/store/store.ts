import { apiMiddleware } from '@/services/api'
import { persistStorage } from '@/utils'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import { errorLoggerMiddleware } from './error-logger-middleware'
import { persistMigrate, persistVersion } from './persist-migration'
import { rootReducer } from './root-reducer'
import { authSlice } from './slices'

// #region Persisted reducer
const whitelist: string[] = [authSlice.name]
const persistedReducer = persistReducer(
  {
    key: 'root',
    migrate: persistMigrate,
    storage: persistStorage,
    version: persistVersion,
    whitelist,
  },
  rootReducer,
)
// #endregion

// #region Middlewares
const middlewares = [apiMiddleware, errorLoggerMiddleware]

if (__DEV__) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
}
// #endregion

// #region Store
const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares)
  },
})
// #endregion

// Enable listener behavior for the store
setupListeners(store.dispatch)

// Persisted version of the store
const persistor = persistStore(store)

// #region Store utils
const dispatchStore = store.dispatch
const getStoreState = store.getState
// #endregion

export { persistor, store, dispatchStore, getStoreState }
