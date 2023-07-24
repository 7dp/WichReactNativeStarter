import { ChuckerScreen, HomeScreen, LoginScreen, ProfileScreen } from '@/screens'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React from 'react'
import { StackParamsKey } from './stack-params'

type StackScreenType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>
  name: StackParamsKey
  options?: NativeStackNavigationOptions
}

const generalStackScreens: StackScreenType[] = [
  {
    component: ChuckerScreen,
    name: 'Chucker',
  },
]

const authStackScreens: StackScreenType[] = [
  {
    component: LoginScreen,
    name: 'Login',
  },
  ...generalStackScreens,
]

const mainStackScreens: StackScreenType[] = [
  {
    component: HomeScreen,
    name: 'Home',
  },
  {
    component: ProfileScreen,
    name: 'Profile',
    // options: noHeaderScreenOptions,
  },
  ...generalStackScreens,
]

export { authStackScreens, mainStackScreens }
