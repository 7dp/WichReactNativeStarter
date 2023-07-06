import { commonStyles, size } from '@/styles'
import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  button: {
    marginTop: size['48px'],
  },

  passwordInput: {
    marginTop: size['16px'],
  },

  root: {
    ...commonStyles.centerVertical,
    ...commonStyles.pagePadding,
  },
})

export { style }
