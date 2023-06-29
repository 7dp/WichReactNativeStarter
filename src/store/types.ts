import { rootReducer } from './root-reducer'
import { dispatchStore } from './store'

type RootState = ReturnType<typeof rootReducer>

/**
 * RootState but versioned
 */
type RootStateV1 = RootState

/**
 * Current used RootState version
 */
type CurrentRootState = RootStateV1

/*
 * A union type that holds all RootState versions
 */
type MigrationState = RootStateV1

type AppDispatch = typeof dispatchStore

export type { AppDispatch, MigrationState, CurrentRootState }
