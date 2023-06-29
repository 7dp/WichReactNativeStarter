import {
  BaseResponse,
  GetPokemonsResponse,
  LoginParam,
  LoginResponse,
  RefreshTokenResponse,
} from '@/types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { appBaseQuery } from './app-base-query'
import { Endpoints } from './endpoints'
import { LoadMoreQueryOptions } from './load-more-query-options'
import { Nums } from '@/config'

/**
 * Use this on endpoints that need load-more feature, usually list
 *
 * @example
 * ```
 * list: build.query<AlumnusListResponse, { page: number }>({
 *   query: ({ page }) => ({
 *     url: Endpoints.neverEndingList,
 *     method: 'POST',
 *     params: { page },
 *   }),
 *   ...loadMoreEndpointOptions,
 * })
 * ```
 */
const loadMoreEndpointOptions = {
  // Refetch when the page arg changes
  forceRefetch: LoadMoreQueryOptions.forceRefetchOptions,
  keepUnusedDataFor: 0,
  // Always merge incoming data to the cache entry
  merge: LoadMoreQueryOptions.mergeOptions,
  // Only have one cache entry because the arg always maps to one string
  serializeQueryArgs: LoadMoreQueryOptions.serializeQueryArgsOptions,
  transformResponse: LoadMoreQueryOptions.transformResponse,
}

const api = createApi({
  baseQuery: appBaseQuery,
  reducerPath: 'api',
  refetchOnReconnect: true,
  tagTypes: ['user'],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginParam>({
      query: (params) => ({
        url: Endpoints.login,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['user'],
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: Endpoints.logout,
        method: 'POST',
      }),
    }),
    refreshToken: build.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: Endpoints.refreshToken,
        method: 'GET',
      }),
    }),
    getPokemons: build.query<GetPokemonsResponse, { page: number; limit?: number }>({
      query: ({ page, limit = Nums.perPageDataCount }) => ({
        url: Endpoints.getPokemons,
        method: 'GET',
        params: {
          limit,
          offset: (page - 1) * limit,
        },
      }),
      ...loadMoreEndpointOptions,
    }),
  }),
})

const apiReducer = api.reducer
const apiMiddleware = api.middleware

export const { useLoginMutation, useGetPokemonsQuery } = api

export { api, apiReducer, apiMiddleware }
