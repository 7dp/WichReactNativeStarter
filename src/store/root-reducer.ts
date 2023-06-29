import { combineReducers } from 'redux'
import { authReducer, authSlice } from './slices'
import { api, apiReducer } from '@/services/api'

const rootReducer = combineReducers({
  [api.reducerPath]: apiReducer,
  [authSlice.name]: authReducer,
})

export { rootReducer }
