import { t } from '@/i18n'
import { commonStyles, typography } from '@/styles'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'
import { LoadingIndicator } from './loading-indicator'

type Props = {
  state: { isLoading: boolean; error: FetchBaseQueryError | SerializedError | undefined }
}

const ListEmptyComponent = ({ state }: Props) => {
  return (
    <View style={[commonStyles.flex, commonStyles.center]}>
      {state.isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Text style={style.text}>{t('common.failedToLoadData')}</Text>
          <Text style={style.text}>{`${state?.error}`}</Text>
        </>
      )}
    </View>
  )
}

const style = StyleSheet.create({
  text: {
    ...typography.placeholder,
  } as TextStyle,
})

export { ListEmptyComponent }
