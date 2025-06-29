/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from '@entities/auth'

const loading = ref(false)
const errors = ref<{ [key: string]: any }>({})
const formData = ref({
  nickname: '',
  password: ''
})

export const useLogout = () => {
  const loginStore = useAuthStore()
  const notification = useNotification()
  const router = useRouter()

  const logout = async () => {
    loading.value = true
    errors.value = {}

    try {
      const res = await loginStore.logout()

      if (res?.message) {
        notification.success({
          content: res.message,
          duration: 2000
        })
      }

      router.push('/auth')
    } catch (e: any) {
      if (e.data.message) {
        notification.error({
          content: e.data.message,
          duration: 2000
        })
      }
      if (e.data.data?.errors) {
        errors.value = e.data.data.errors
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errors,
    formData,
    logout
  }
}
