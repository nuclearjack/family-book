import { useAuthStore } from '@entities/auth'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
) => {
  const authStore = useAuthStore()

  const { isAuth } = storeToRefs(authStore)

  if (!isAuth.value && (to.path !== '/auth')) {
    return navigateTo('/auth')
  }

  if (isAuth.value && (to.path === '/auth')) {
    navigateTo('/')
  }
})
