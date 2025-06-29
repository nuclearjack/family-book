/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from '@entities/auth'

const loading = ref(false)
const errors = ref<{ [key: string]: any }>({})
const formData = ref({
  nickname: '',
  password: ''
})

export const useLogin = () => {
  const authStore = useAuthStore()
  const notification = useNotification()
  const router = useRouter()

  const login = async () => {
    if (!validate()) return false

    loading.value = true
    errors.value = {}

    try {
      const payload = formData.value
      const res = await authStore.login(payload)

      if (res?.message) {
        notification.success({
          content: res.message,
          duration: 2000
        })
      }

      router.push('/')
      reset()
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

  const validate = () => {
    errors.value = {}
    if (!formData.value.nickname) errors.value.nickname = 'Введите никнейм'
    if (!formData.value.password) errors.value.password = 'Введите пароль'
    return Object.keys(errors.value).length === 0
  }

  const reset = () => {
    loading.value = false
    errors.value = {}
    formData.value = {
      nickname: '',
      password: ''
    }
  }

  return {
    loading,
    errors,
    formData,
    login,
    reset
  }
}
