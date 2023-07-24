import { navigationContainerRef } from '@/app'
import { Colors, commonStyles, size } from '@/styles'
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet'
import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { VectorIcon } from './vector-icon'

const ChuckerButton = () => {
  const onPress = () => {
    navigationContainerRef.navigate('Chucker')
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      style={style.button}
      underlayColor={Colors.black18}
    >
      <VectorIcon props={{ color: Colors.dodgerBlue, name: 'network-check' }} />
    </TouchableHighlight>
  )
}

const style = StyleSheet.create({
  button: {
    ...commonStyles.shadow,
    backgroundColor: Colors.white,
    borderRadius: size['20px'],
    padding: size['8px'],
    position: 'absolute',
    top: WINDOW_HEIGHT / 3,
  },
})

export { ChuckerButton }
