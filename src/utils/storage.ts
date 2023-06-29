import { StorageKey } from '@/types'
import { MMKV, useMMKVString } from 'react-native-mmkv'

const MMKVStorage = new MMKV()

function setItem<Key extends keyof StorageKey>(key: Key, value: StorageKey[Key]) {
  MMKVStorage.set(key, typeof value === 'string' ? value : JSON.stringify(value))
}

function getItem<Key extends keyof StorageKey>(
  key: Key,
  isObject = false,
): StorageKey[Key] | undefined {
  const value = MMKVStorage.getString(key)

  if (value === undefined) {
    return undefined
  }
  if (isObject) {
    return JSON.parse(value) as StorageKey[Key]
  }

  // @ts-ignore
  return value
}

function removeItem<Key extends keyof StorageKey>(key: Key) {
  MMKVStorage.delete(key)
}

function removeItems<Keys extends readonly (keyof StorageKey)[]>(keys: Keys) {
  for (const key of keys) {
    MMKVStorage.delete(key)
  }
}

function useLocalStorage<Key extends keyof StorageKey>(
  key: Key,
  isObject = false,
): [StorageKey[Key] | undefined, (newValue: StorageKey[Key] | undefined) => void] {
  const [value, setValue] = useMMKVString(key)
  if (value !== undefined && isObject) {
    // @ts-ignore
    return [JSON.parse(value), setValue]
  }
  // @ts-ignore
  return [value, setValue]
}

const Storage = { setItem, getItem, removeItem, removeItems }

export { MMKVStorage, Storage, useLocalStorage }
