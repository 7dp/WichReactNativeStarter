import { StyleSheet, TextStyle } from 'react-native'
import { Colors } from './colors'
import { size } from './size'

const getLineHeightFor = (fontSize: number) => {
  return fontSize + Math.round(fontSize / 4)
}

const typography = StyleSheet.create({
  heading1: {
    color: Colors.black82,
    fontSize: size['24px'],
    lineHeight: getLineHeightFor(size['24px']),
    fontWeight: '700',
  } as TextStyle,

  heading2: {
    color: Colors.black82,
    fontSize: size['21px'],
    lineHeight: getLineHeightFor(size['21px']),
    fontWeight: '700',
  } as TextStyle,

  heading3: {
    color: Colors.black82,
    fontSize: size['17px'],
    lineHeight: getLineHeightFor(size['17px']),
  } as TextStyle,

  heading4: {
    color: Colors.black82,
    fontSize: size['14px'],
    lineHeight: getLineHeightFor(size['14px']),
  } as TextStyle,

  heading5: {
    color: Colors.black82,
    fontSize: size['12px'],
    lineHeight: getLineHeightFor(size['12px']),
  } as TextStyle,

  heading6: {
    color: Colors.black82,
    fontSize: size['10px'],
    lineHeight: getLineHeightFor(size['10px']),
  } as TextStyle,

  placeholder: {
    color: Colors.black34,
    fontSize: size['14px'],
    lineHeight: getLineHeightFor(size['14px']),
  },
})

export { typography }
