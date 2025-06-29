import { $fetch } from 'ofetch'
import type {
  CheckAuthResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse
} from './types'

export const login = async (payload: LoginRequest) => {
  return await $fetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: payload
  })
}

export const register = async (payload: RegisterRequest) => {
  return await $fetch<RegisterResponse>('/api/auth/register', {
    method: 'POST',
    body: payload
  })
}

export const logout = async () => {
  return await $fetch<LogoutResponse>('/api/auth/logout')
}

export const checkAuth = async () => {
  return await $fetch<CheckAuthResponse>('/api/auth/me')
}

export * from './types'
