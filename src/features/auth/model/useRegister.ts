/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from '@entities/auth'

const loading = ref(false)
const errors = ref<Record<string, string>>({})
const formData = ref({
  nickname: '',
  password: '',
  passwordRepeat: '',
  name: '',
  surname: '',
  patronymic: ''
})

export const useRegister = () => {
  const authStore = useAuthStore()
  const notification = useNotification()
  const router = useRouter()

  const validate = () => {
    errors.value = {}
    if (!formData.value.nickname) errors.value.nickname = 'Введите никнейм'
    if (!formData.value.password) errors.value.password = 'Введите пароль'
    if (!formData.value.passwordRepeat) errors.value.passwordRepeat = 'Введите пароль еще раз'
    return Object.keys(errors.value).length === 0
  }

  const reset = () => {
    loading.value = false
    errors.value = {}
    formData.value = {
      nickname: '',
      password: '',
      passwordRepeat: '',
      name: '',
      surname: '',
      patronymic: ''
    }
  }

  const register = async () => {
    if (!validate()) return false
    loading.value = true
    errors.value = {}

    try {
      const payload = formData.value
      const res = await authStore.register(payload, false)

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

  return {
    formData,
    errors,
    register,
    validate,
    reset
  }
}
