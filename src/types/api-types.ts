import { User } from './shared-types'

type BaseResponse = {
  message?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type LoginResponse = BaseResponse & { user: User }
type LoginParam = {
  no_hp: string
  password: string
  regid: string
}

type RefreshTokenResponse = BaseResponse & { token: string }

type Pokemon = { name: string; url: string }
type GetPokemonsResponse = BaseResponse & { count: number; results: Pokemon[] }

export {
  BaseResponse,
  RefreshTokenResponse,
  LoginParam,
  LoginResponse,
  Pokemon,
  GetPokemonsResponse,
}
