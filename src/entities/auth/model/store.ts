import { defineStore } from 'pinia'
import * as AuthApi from './../api'
import type { User, LoginRequest, RegisterRequest } from './../api'

interface AuthState {
  user: User | null
  isAuth: boolean
  error: string | null
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuth: false,
    isLoading: false,
    error: null
  }),
  getters: {
    isAdmin: (state) => state.user?.user_id === 1
  },
  actions: {
    setUser (user: User) {
      this.user = user
      this.isAuth = true
      this.error = null
    },
    unsetUser () {
      this.user = null
      this.isAuth = false
      this.error = null
    },
    async register (payload: RegisterRequest, set: boolean = true) {
      this.isLoading = true

      try {
        const res = await AuthApi.register(payload)

        if (res.user && set) {
          this.setUser(res.user)
        }

        return res
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка регистрации'
      } finally {
        this.isLoading = false
      }
    },
    async login (payload: LoginRequest) {
      this.isLoading = true

      try {
        const res = await AuthApi.login(payload)

        if (res.user) {
          this.setUser(res.user)
        }

        return res
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка входа'
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async initUser () {
      this.isLoading = true

      try {
        const res = await AuthApi.checkAuth()

        if (res.session?.user) {
          this.setUser(res.session.user)
        }

        return res
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка инициализации пользователя'
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async logout () {
      this.isLoading = true

      try {
        const res = await AuthApi.logout()

        this.unsetUser()

        return res
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка выхода'
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
