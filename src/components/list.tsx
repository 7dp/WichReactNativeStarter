import { commonStyles, size } from '@/styles'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { ContentStyle, FlashList, FlashListProps } from '@shopify/flash-list'
import React, {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ListEmptyComponent } from './list-empty-component'
import { LoadingIndicator } from './loading-indicator'

type ListProps<T> = FlashListProps<T> &
  Required<
    Pick<FlashListProps<T>, 'data' | 'keyExtractor' | 'renderItem' | 'estimatedItemSize'>
  >

type Props<T> = {
  listProps: ListProps<T>
  isLoading: boolean
  isFetching: boolean
  lastPageCondition?: boolean
  refreshFn: () => void
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isRefreshing: boolean
  setIsRefreshing: Dispatch<SetStateAction<boolean>>
  error?: FetchBaseQueryError | SerializedError | undefined
  shouldReplaceExistingContentContainerStyle?: boolean
}

const _List = <T,>(props: Props<T>, ref: ForwardedRef<FlashList<T>>) => {
  // #region Props
  const {
    error,
    listProps,
    isFetching,
    isLoading,
    lastPageCondition = false,
    refreshFn,
    page,
    setPage,
    isRefreshing,
    setIsRefreshing,
    shouldReplaceExistingContentContainerStyle,
  } = props
  // #region Other hooks
  const { bottom } = useSafeAreaInsets()

  // #region States
  const [isLastPage, setIsLastPage] = useState(false)

  // #region Functions
  const refresh = useCallback(() => {
    if (isLoading || isFetching) return

    setIsRefreshing(true)
    setIsLastPage(false)
    setPage(1)
  }, [isLoading, isFetching])

  const loadMore = useCallback(() => {
    if (isLoading || isFetching || isLastPage) return

    setPage((current) => current + 1)
  }, [isLoading, isFetching, isLastPage])

  // #region Effects
  useEffect(
    function handleRefreshState() {
      if (isRefreshing && page === 1) {
        refreshFn()
      }
    },
    [isRefreshing, page],
  )

  useEffect(
    function handleLastPageState() {
      if (lastPageCondition) setIsLastPage(true)
    },
    [lastPageCondition],
  )

  let contentContainerStyle: ContentStyle = {}
  if (shouldReplaceExistingContentContainerStyle) {
    contentContainerStyle = {
      ...listProps?.contentContainerStyle,
    }
  } else
    contentContainerStyle = {
      ...style.listContentContainerStyle,
      paddingBottom: bottom || size['20px'],
      ...listProps?.contentContainerStyle,
    }

  return (
    <FlashList
      ref={ref}
      ListEmptyComponent={<ListEmptyComponent state={{ error, isLoading }} />}
      ListFooterComponent={
        !isLoading && isFetching ? (
          <LoadingIndicator
            props={{ size: 'small', style: commonStyles.listFooterLoadingIndicator }}
          />
        ) : null
      }
      refreshing={isRefreshing}
      onRefresh={refresh}
      onEndReachedThreshold={0.3}
      onEndReached={loadMore}
      showsVerticalScrollIndicator
      {...listProps}
      contentContainerStyle={contentContainerStyle}
    />
  )
}

const style = StyleSheet.create({
  listContentContainerStyle: {
    paddingLeft: size['16px'],
  } as ContentStyle,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const List = forwardRef<FlashList<any>, Props<any>>(_List)

export { List }
