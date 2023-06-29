import { StackParams } from '@/navigator'
import { commonStyles } from '@/styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Text, View } from 'react-native'

const ProfileScreen: FC<NativeStackScreenProps<StackParams, 'Profile'>> = () => {
  return (
    <View style={[commonStyles.screen, commonStyles.center]}>
      <Text>Profile</Text>
    </View>
  )
}

export { ProfileScreen }
