import { Nums, baseUrl } from '@/config'
import { CurrentRootState } from '@/store'
import { authActions } from '@/store/slices'
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/dist/query'
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers'
import { Mutex } from 'async-mutex'
import { Endpoints } from './endpoints'

const prepareHeaders:
  | ((
      headers: Headers,
      api: Pick<BaseQueryApi, 'type' | 'getState' | 'extra' | 'endpoint' | 'forced'>,
    ) => MaybePromise<void | Headers>)
  | undefined = (headers, api) => {
  const { token } = (api.getState() as CurrentRootState).auth
  if (token) headers.set('authorization', `Bearer ${token}`)
  return headers
}

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders,
  timeout: Nums.queryTimeoutInMilliseconds,
})

const appBaseQuery = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    // Exclude Login endpoint because no need to handle
    // token refreshing on it
    if (result.error?.status === 401 && api.endpoint !== Endpoints.login) {
      // Checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        try {
          const refreshResponse = await baseQuery(
            Endpoints.refreshToken,
            api,
            extraOptions,
          )

          // @ts-ignore
          if (refreshResponse.data && refreshResponse.data.token) {
            // @ts-ignore
            api.dispatch(authActions.setToken(refreshResponse.data.token))
            // Retry the initial query
            result = await baseQuery(args, api, extraOptions)
          } else {
            api.dispatch(authActions.logout())
          }
        } finally {
          // Release must be called once the mutex should be released again
          release()
        }
      } else {
        // Wait until the mutex is available without locking it
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }

      // Bail out of re-tries immediately if unauthorized,
      // because we know successive re-retries would be redundant
      retry.fail(result.error)
    }

    return result
  },
  { maxRetries: Nums.queryMaxRetry },
)

export { appBaseQuery }
