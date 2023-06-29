import { useAppSelector } from '@/store'
import { selectIsLoggedIn } from '@/store/slices'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { defaultScreenOptions } from './screen-options'
import { StackParams } from './stack-params'
import { authStackScreens, mainStackScreens } from './stack-screens'

const Stack = createNativeStackNavigator<StackParams>()

const StackNavigator: FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'Login'}
      screenOptions={defaultScreenOptions}
    >
      {isLoggedIn
        ? mainStackScreens.map((screen) => (
            <Stack.Screen
              key={`screen-${screen.name}`}
              component={screen.component}
              name={screen.name}
              options={screen.options}
            />
          ))
        : authStackScreens.map((screen) => (
            <Stack.Screen
              key={`screen-${screen.name}`}
              component={screen.component}
              name={screen.name}
              options={screen.options}
            />
          ))}
    </Stack.Navigator>
  )
}

export { StackNavigator }
