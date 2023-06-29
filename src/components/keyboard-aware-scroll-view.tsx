import { usePaddingBottom } from '@/hooks'
import { commonStyles } from '@/styles'
import React, { memo, ReactNode } from 'react'
import { ViewStyle } from 'react-native'
import {
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollView as RNKeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view'

type Props = {
  children?: ReactNode
  props?: KeyboardAwareScrollViewProps
  useInset?: boolean
}

const KeyboardAwareScrollView = memo(({ children, props, useInset }: Props) => {
  let contentContainerStyle = {
    ...commonStyles.background,
    ...commonStyles.flexGrow,
  } as ViewStyle

  if (useInset === undefined || useInset === true) {
    contentContainerStyle = {
      ...contentContainerStyle,
      ...commonStyles.pagePadding,
      ...usePaddingBottom(),
    }
  }

  return (
    <RNKeyboardAwareScrollView
      enableOnAndroid
      {...props}
      contentContainerStyle={[contentContainerStyle, { ...props }?.contentContainerStyle]}
    >
      {children}
    </RNKeyboardAwareScrollView>
  )
})

export { KeyboardAwareScrollView }
