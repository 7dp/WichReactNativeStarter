import { List } from '@/components'
import { t } from '@/i18n'
import { StackParams } from '@/navigator'
import { api, useGetPokemonsQuery } from '@/services/api'
import { useAppDispatch } from '@/store'
import { authActions } from '@/store/slices'
import { commonStyles, typography } from '@/styles'
import { Pokemon } from '@/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import React, { FC, useLayoutEffect, useRef, useState } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { style } from './style'

const HomeScreen: FC<NativeStackScreenProps<StackParams, 'Home'>> = ({ navigation }) => {
  // #region Redux
  const dispatch = useAppDispatch()

  // #region Refs
  const listRef = useRef<FlashList<unknown>>(null)

  // #region States
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [page, setPage] = useState(1)

  // #region APIs
  const { data, error, isFetching, isLoading } = useGetPokemonsQuery({ page })

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: renderHeaderRight })
  }, [])

  // #region Functions
  const refresh = () => {
    dispatch(
      api.endpoints.getPokemons.initiate(
        { page },
        { forceRefetch: true, subscribe: false },
      ),
    ).then(() => {
      // Scroll to top when refresh completed
      listRef.current?.scrollToOffset({ offset: 0, animated: true })
      setIsRefreshing(false)
    })
  }

  const logout = () => {
    dispatch(authActions.logout())
  }

  // #region Renders
  const renderHeaderRight = () => {
    return (
      <Text style={style.logoutText} onPress={logout}>
        {t('home.logout')}
      </Text>
    )
  }

  const renderItem = ({ item }: ListRenderItemInfo<Pokemon>) => {
    return (
      <TouchableHighlight style={style.listItem}>
        <>
          <Text style={typography.heading2}>{item.name}</Text>
          <Text style={typography.heading3}>{item.url}</Text>
        </>
      </TouchableHighlight>
    )
  }

  const renderSeparator = () => {
    return <View style={style.separator} />
  }

  return (
    <View style={commonStyles.root}>
      <List
        ref={listRef}
        error={error}
        isFetching={isFetching}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        lastPageCondition={data?.is_last_page}
        page={page}
        refreshFn={refresh}
        setIsRefreshing={setIsRefreshing}
        setPage={setPage}
        listProps={{
          data: data?.results,
          estimatedItemSize: 60,
          ItemSeparatorComponent: renderSeparator,
          keyExtractor: (item: Pokemon) => item.url,
          renderItem,
        }}
      />
    </View>
  )
}

export { HomeScreen }
