import { baseUrlKey, Nums } from '@/config'
import { createMigrate } from 'redux-persist'
import { MigrationState } from './types'

/**
 * Each migration step will take one version as input and return the next version as output.
 * (The key `2` means that it is the step which migrates from V1 to V2).
 *
 * @example
 * ```ts
 * // codeblock-meta title="migration from v1 to v2 example"
 *
 * const persistMigrations = {
 *  2: (state: RootStateV1): RootStateV2 => ({
 *    ...state,
 *    auth: {
 *      ...state.auth,
 *      token: 'my custom token for v2, set!'
 *    }
 *  })
 * }
 * ```
 */
const persistMigrations = {}

/**
 * The union type is used as the generic for `createMigrate`. The type must be explicitly
 * provided. Relying on type inference here would fail because it would assume {}.
 */
const persistMigrate = createMigrate<MigrationState>(persistMigrations, {
  debug: baseUrlKey !== 'LIVE',
})

const availableVersion = Object.keys(persistMigrations).map((i) => Number(i))
/**
 * This is the current version and should match the latest version on 'persistMigrations' above.
 * Default version is 1.
 *
 * If you define new version that is higher than the current version in 'persistMigrations' obj,
 * then this const will automatically use the highest version available.
 */
const persistVersion = availableVersion.length
  ? Math.max(...availableVersion)
  : Nums.defaultPersistVersion

export { persistMigrate, persistVersion }
