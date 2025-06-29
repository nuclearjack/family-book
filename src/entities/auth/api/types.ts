/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  user_id: number
  nickname: string
  name: string | null
  surname: string | null
  patronymic: string | null
}

export interface RegisterRequest {
  nickname: string
  password: string
  passwordRepeat: string
}

export interface RegisterResponse {
  success: boolean
  user: {
    user_id: number
    nickname: string
    name: string | null
    surname: string | null
    patronymic: string | null
  }
  message?: string
  data?: any
}

export interface LoginRequest {
  nickname: string
  password: string
}

export type LoginResponse = RegisterResponse

export interface LogoutResponse {
  success: boolean
  message?: string
}

export interface CheckAuthResponse {
  success: boolean
  session: {
    id: string
    user: {
      user_id: number
      nickname: string
      name: string | null
      surname: string | null
      patronymic: string | null
    }
  }
}
