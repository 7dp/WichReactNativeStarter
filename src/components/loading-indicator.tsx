import { Colors, size } from '@/styles'
import React from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  ViewStyle,
} from 'react-native'

type Props = {
  props?: ActivityIndicatorProps
}

const LoadingIndicator = ({ props }: Props) => {
  return (
    <ActivityIndicator
      color={Colors.black34}
      size="large"
      {...props}
      style={[style.indicator, { ...props }?.style]}
    />
  )
}

const style = StyleSheet.create({
  indicator: {
    margin: size['20px'],
  } as ViewStyle,
})

export { LoadingIndicator }
