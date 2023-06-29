import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, CurrentRootState } from './types'

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<CurrentRootState> = useSelector

export { useAppDispatch, useAppSelector }
