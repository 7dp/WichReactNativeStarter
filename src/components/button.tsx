import { Colors, commonStyles, size, typography } from '@/styles'
import React from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { PressableScale, PressableScaleProps } from 'react-native-pressable-scale'

type Type = 'contained' | 'outline' | 'text'

type Props = {
  text: string
  indicatorProps?: ActivityIndicatorProps
  isLoading?: boolean
  textProps?: TextProps
  props?: Partial<PressableScaleProps>
  type?: Type
}

const Button = (iProps: Props) => {
  const { text, indicatorProps, isLoading, textProps, props, type } = iProps

  const isDisabled = !!{ ...props }?.disabled || !!isLoading
  const isContained = !type || type === 'contained'

  let labelStyle = style.labelContainedType as TextStyle
  if (type === 'outline') labelStyle = style.labelOutlineType
  if (type === 'text') labelStyle = style.labelTextType

  const renderContent = () => {
    const isOutlineOrTextAndIsDisabled =
      isDisabled && (type === 'outline' || type === 'text')

    return (
      <View style={commonStyles.centerRow}>
        {isLoading ? (
          <ActivityIndicator
            color={isContained ? Colors.white : Colors.black34}
            size="small"
            {...indicatorProps}
            style={[style.indicator, { ...indicatorProps }?.style]}
          />
        ) : null}
        <Text
          style={[
            labelStyle,
            isOutlineOrTextAndIsDisabled && style.labelDisabled,
            { ...textProps }?.style,
          ]}
        >
          {text}
        </Text>
      </View>
    )
  }

  // Default pressable style is style of 'contained' button
  let pressableStyle = {
    ...style.pressableContainedType,
    backgroundColor: isDisabled ? Colors.black25 : Colors.dodgerBlue,
    elevation: isDisabled ? size['0px'] : size['4px'],
    shadowOpacity: isDisabled ? size['0px'] : 0.3,
  } as ViewStyle

  const pressableOutlineStyle = {
    ...style.pressableOutlineType,
    borderColor: isDisabled ? Colors.black25 : Colors.dodgerBlue25,
  } as ViewStyle

  if (type === 'outline') pressableStyle = pressableOutlineStyle
  if (type === 'text') pressableStyle = style.pressableTextType

  return (
    <PressableScale
      activeScale={type === 'text' ? 0.9 : 0.95}
      disabled={isDisabled}
      weight="light"
      {...props}
      style={[pressableStyle, { ...props }?.style]}
    >
      {renderContent()}
    </PressableScale>
  )
}

const baseStyle = StyleSheet.create({
  label: {
    ...typography.heading4,
    fontWeight: '700',
    letterSpacing: 0.7,
    lineHeight: undefined,
  } as TextStyle,

  pressable: {
    ...commonStyles.borderRadius,
    ...commonStyles.center,
    height: size['48px'],
    paddingHorizontal: size['20px'],
  } as ViewStyle,
})

const style = StyleSheet.create({
  indicator: {
    paddingEnd: size['8px'],
  } as ViewStyle,

  labelContainedType: {
    ...baseStyle.label,
    color: Colors.white,
  } as TextStyle,

  labelDisabled: {
    color: Colors.black50,
  } as TextStyle,

  labelOutlineType: {
    ...baseStyle.label,
    color: Colors.dodgerBlue,
  } as TextStyle,

  labelTextType: {
    ...baseStyle.label,
    color: Colors.dodgerBlue,
    textDecorationLine: 'underline',
  } as TextStyle,

  pressableContainedType: {
    ...baseStyle.pressable,
    ...commonStyles.shadow,
    backgroundColor: Colors.dodgerBlue,
    shadowColor: Colors.dodgerBlue,
  },

  pressableOutlineType: {
    ...baseStyle.pressable,
    ...commonStyles.borderLine,
    backgroundColor: Colors.white,
  },

  pressableTextType: {
    ...commonStyles.center,
    paddingHorizontal: size['4px'],
    paddingVertical: size['2px'],
  },
})

export { Button }
