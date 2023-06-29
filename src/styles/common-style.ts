import { Colors } from './colors'
import { size } from './size'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const numberOfLines = 6
const textHeight = 16.5

const commonStyles = StyleSheet.create({
  absolute: {
    bottom: size['0px'],
    left: size['0px'],
    position: 'absolute',
    right: size['0px'],
    top: size['0px'],
  } as ViewStyle,

  background: {
    backgroundColor: Colors.white,
  } as ViewStyle,

  borderLine: {
    borderColor: Colors.black25,
    borderWidth: size['1px'],
  } as ViewStyle,

  borderRadius: {
    borderRadius: size['8px'],
  } as ViewStyle,

  center: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  } as ViewStyle,

  centerRow: {
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,

  centerVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
  } as ViewStyle,

  flex: {
    flex: 1,
  } as ViewStyle,

  flexGrow: {
    flexGrow: 1,
  } as ViewStyle,

  listFooterLoadingIndicator: {
    margin: size['20px'],
    marginBottom: size['0px'],
  },

  multilineTextInput: {
    height: textHeight * numberOfLines,
    paddingBottom: size['10px'],
    paddingTop: size['10px'],
  } as TextStyle,

  pagePadding: {
    padding: size['20px'],
  } as ViewStyle,

  root: {
    backgroundColor: Colors.white,
    flex: 1,
  } as ViewStyle,

  row: {
    flexDirection: 'row',
  } as ViewStyle,

  screen: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: size['20px'],
  },

  shadow: {
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.black25,
    shadowOffset: {
      height: size['2px'],
      width: size['0px'],
    },
    shadowOpacity: 0.3,
    shadowRadius: size['4px'],
  } as ViewStyle,

  spaceBetweenListItem: {
    marginTop: size['16px'],
  } as ViewStyle,
})

export { commonStyles }
