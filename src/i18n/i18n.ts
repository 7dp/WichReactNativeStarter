import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'
import en from './en.json'
import id from './id.json'

// Set the key-value pairs for the different languages you want to support
const translations = { id, en }
const i18n = new I18n(translations)

i18n.locale = 'id' // Default language of the app is Indonesian
// Uncomment line below if you want the app to use a language based on their phone locale
// i18n.locale = Localization.getLocales()[0].languageCode

i18n.enableFallback = true

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not Indonesian.
 */
type DefaultLocale = typeof id

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text

type TxKeyPath = RecursiveKeyOf<DefaultLocale>

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
const t = (key: TxKeyPath, options?: I18n.TranslateOptions) => {
  return key ? i18n.t(key, options) : ''
}

export type { TxKeyPath }
export { t }
