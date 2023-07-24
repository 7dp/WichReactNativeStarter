import { StackParams } from '@/navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import NetworkLogger from 'react-native-network-logger'

const ChuckerScreen: FC<NativeStackScreenProps<StackParams, 'Chucker'>> = () => {
  return <NetworkLogger />
}

export { ChuckerScreen }
