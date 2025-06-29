import { useAuthStore } from '@entities/auth'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
) => {
  const authStore = useAuthStore()

  const { isAuth, user } = storeToRefs(authStore)

  if (!isAuth.value && (to.path === '/register')) {
    return navigateTo('/auth')
  }

  if (user.value?.user_id !== 1 && (to.path === '/register')) {
    return navigateTo('/')
  }
})
