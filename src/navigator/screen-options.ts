import { typography } from '@/styles'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  headerTitle: {
    ...typography.heading3,
    color: typography.heading3.color as string,
  },
})

const defaultScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  freezeOnBlur: true,
  gestureEnabled: true,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerTitleStyle: style.headerTitle,
}

const noHeaderScreenOptions = <NativeStackNavigationOptions>(
  (() => ({ headerShown: false }))
)

export { defaultScreenOptions, noHeaderScreenOptions }
