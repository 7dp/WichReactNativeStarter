import { Colors, size } from '@/styles'
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet'
import React, { forwardRef, memo, ReactNode, useCallback, useMemo } from 'react'
import { Keyboard, StyleSheet, ViewStyle } from 'react-native'
import {
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

type Props = {
  props?: Partial<BottomSheetProps>
  children?: ReactNode
  safeAreaProps?: SafeAreaViewProps
  isDismissible?: boolean
}

const _BottomSheet = forwardRef<RNBottomSheet, Props>((props, ref) => {
  const { props: sheetProps, children, safeAreaProps, isDismissible } = props

  const { bottom } = useSafeAreaInsets()
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])
  const {
    animatedContentHeight,
    animatedSnapPoints,
    animatedHandleHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

  const onChange = useCallback((index: number) => {
    const isOpened = index === 0
    const isClosed = index === -1
    if (isOpened || isClosed) Keyboard.dismiss()

    sheetProps?.onChange?.(index)
  }, [])

  const safeAreaStyle: ViewStyle = {
    margin: size['20px'],
    marginBottom: bottom ? size['0px'] : size['20px'],
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  )

  return (
    <RNBottomSheet
      ref={ref}
      backdropComponent={renderBackdrop}
      backgroundStyle={style.background}
      contentHeight={animatedContentHeight}
      enablePanDownToClose={isDismissible ?? true}
      handleHeight={animatedHandleHeight}
      handleIndicatorStyle={style.handleIndicator}
      index={-1}
      keyboardBlurBehavior="restore"
      onChange={onChange}
      {...sheetProps}
      snapPoints={animatedSnapPoints}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <SafeAreaView
          edges={['bottom', 'left', 'right']}
          {...safeAreaProps}
          style={[safeAreaStyle, { ...safeAreaProps }?.style]}
        >
          {children}
        </SafeAreaView>
      </BottomSheetView>
    </RNBottomSheet>
  )
})

const style = StyleSheet.create({
  background: {
    borderBottomLeftRadius: size['0px'],
    borderBottomRightRadius: size['0px'],
  },
  handleIndicator: {
    backgroundColor: Colors.black34,
    width: size['40px'],
  },
})

const BottomSheet = memo(_BottomSheet)

export { BottomSheet }
