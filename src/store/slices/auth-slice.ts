import { api } from '@/services/api'
import { User } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CurrentRootState } from '../types'

type InitialState = {
  user: User | undefined
  token: string | undefined
  fcmToken: string | undefined
}

const initialState: InitialState = {
  user: undefined,
  token: undefined,
  fcmToken: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.token = 'abracadabra'
    },
    logout: (state) => {
      state.user = undefined
      state.token = undefined
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setFCMToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload
    },
  },
  extraReducers(builder) {
    const { login, logout, refreshToken } = api.endpoints

    builder
      .addMatcher(login.matchFulfilled, (state, { payload }) => {
        state.user = payload.user
      })
      .addMatcher(logout.matchFulfilled, (state) => {
        state.user = undefined
        state.token = undefined
      })
      .addMatcher(refreshToken.matchFulfilled, (state, { payload }) => {
        state.token = payload.token
      })
  },
})

// #region Selectors
const selectIsLoggedIn = (state: CurrentRootState) => !!state.auth.user
// #endregion

const authReducer = authSlice.reducer
const authActions = authSlice.actions

export { selectIsLoggedIn }
export { authSlice, authReducer, authActions }
