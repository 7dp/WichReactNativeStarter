import { Dimensions } from 'react-native'

const size = {
  '0px': 0,
  '1px': 1,
  '2px': 2,
  '4px': 4,
  '8px': 8,
  '10px': 10,
  '12px': 12,
  '14px': 14,
  '16px': 16,
  '17px': 17,
  '20px': 20,
  '21px': 21,
  '24px': 24,
  '32px': 32,
  '48px': 48,
  '56px': 56,
} as const

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export { size, windowHeight, windowWidth }
