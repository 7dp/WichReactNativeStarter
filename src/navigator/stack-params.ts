type StackParams = {
  Login: undefined
  Home: undefined
  Profile: undefined
  Chucker: undefined
}

type StackParamsKey = keyof Partial<StackParams>

export type { StackParamsKey, StackParams }
