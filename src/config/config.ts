const baseUrls = {
  DEV: 'https://pokeapi.co/api/v2',
  LIVE: '',
} as const

const baseUrlKey = <keyof typeof baseUrls>'DEV'

const baseUrl = baseUrls[baseUrlKey]

export { baseUrl, baseUrlKey }
