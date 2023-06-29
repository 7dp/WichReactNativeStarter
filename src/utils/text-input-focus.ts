import { RefObject, useCallback } from 'react'
import { TextInput } from 'react-native'

const setFocus = useCallback((ref: RefObject<TextInput>) => {
  ref.current?.focus()
}, [])

export { setFocus }
