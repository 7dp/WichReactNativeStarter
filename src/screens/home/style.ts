import { Colors, size } from '@/styles'
import { StyleSheet, TextStyle } from 'react-native'

const style = StyleSheet.create({
  listItem: {
    paddingVertical: size['12px'],
  },

  logoutText: {
    color: Colors.dodgerBlue,
  } as TextStyle,

  separator: {
    backgroundColor: Colors.black25,
    height: 0.5,
  },
})

export { style }
