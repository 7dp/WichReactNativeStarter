import { size } from '@/styles'
import React, { memo } from 'react'
import { IconProps } from 'react-native-vector-icons/Icon'
import MateriaCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

type Props = {
  source?: 'material' | 'material-community'
  props: IconProps
}

const VectorIcon = memo(({ props, source }: Props) => {
  if (source === 'material-community') {
    return <MateriaCommunityIcon size={size['20px']} {...props} />
  }
  return <MaterialIcon size={size['20px']} {...props} />
})

export { VectorIcon }
