/* eslint-disable @typescript-eslint/no-explicit-any */
import { Nums } from '@/config'
import { EndpointDefinition } from '@reduxjs/toolkit/dist/query'
import { QuerySubState, RootState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'

const mergeOptions = (
  currentCacheData: any,
  responseData: any,
  otherArgs: {
    arg: { page: number }
    baseQueryMeta: FetchBaseQueryMeta | undefined
    requestId: string
    fulfilledTimeStamp: number
  },
): void | any => {
  const { page } = otherArgs.arg

  if (page !== 1) {
    const combination = responseData
    combination.results = [...currentCacheData.results, ...responseData.results]
    return combination
  }

  return responseData
}

const forceRefetchOptions = (params: {
  currentArg: { page: number } | undefined
  previousArg: { page: number } | undefined
  state: RootState<any, any, string>
  endpointState?: QuerySubState<any> | undefined
}): boolean => {
  const { currentArg, previousArg } = params
  if (currentArg && previousArg) return currentArg !== previousArg
  return false
}

const serializeQueryArgsOptions = (definition: {
  queryArgs: any
  endpointDefinition: EndpointDefinition<any, any, any, any, string>
  endpointName: string
}) => definition.endpointName

const transformResponse = (
  baseQueryReturnValue: unknown,
  meta: FetchBaseQueryMeta | undefined,
  arg: { page: number },
): any | Promise<any> => {
  const response = baseQueryReturnValue as any
  const isLastPage = response.results.length < Nums.perPageDataCount
  return {
    ...response,
    is_last_page: isLastPage,
  }
}

const LoadMoreQueryOptions = {
  mergeOptions,
  forceRefetchOptions,
  serializeQueryArgsOptions,
  transformResponse,
}

export { LoadMoreQueryOptions }
