import { t } from '@/i18n'
import { Colors, commonStyles, size } from '@/styles'
import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import Animated, { Layout, SlideInUp, SlideOutUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VectorIcon } from './vector-icon'

const NetworkInfo = () => {
  const { top } = useSafeAreaInsets()

  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const listener = (state: NetInfoState) => {
      const offline = state.isConnected === false && state.isInternetReachable === false
      setIsOffline(offline)
    }

    const unsubscribe = NetInfo.addEventListener(listener)

    return () => {
      unsubscribe()
    }
  }, [])

  const root: ViewStyle = {
    ...style.root,
    top,
  }

  if (!isOffline) return null

  return (
    <Animated.View entering={SlideInUp} exiting={SlideOutUp} layout={Layout} style={root}>
      <View style={style.container}>
        <VectorIcon
          props={{
            color: Colors.white,
            name: 'cloud-off',
            size: size['20px'],
          }}
        />
        <Text disabled style={style.textNetworkChange}>
          {t('common.youOffline')}
        </Text>
      </View>
    </Animated.View>
  )
}
const style = StyleSheet.create({
  container: {
    ...commonStyles.center,
    ...commonStyles.row,
    backgroundColor: Colors.red,
    paddingHorizontal: size['20px'],
    paddingVertical: size['4px'],
    width: '100%',
  },

  root: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  textNetworkChange: {
    color: Colors.white,
    marginStart: size['8px'],
  } as TextStyle,
})

export { NetworkInfo }
