/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePersonStore } from '@entities/person'

const deleteId = ref<number | null>(null)
const showDeleteModal = ref(false)

export const usePersonDelete = () => {
  const store = usePersonStore()
  const notification = useNotification()

  const deletePerson = async () => {
    try {
      if (!deleteId.value) return
      showDeleteModal.value = false
      const res = await store.deletePerson(deleteId.value)
      if (res.message) {
        notification.success({ content: res.message, duration: 2000 })
      }
      return res
    } catch (e: any) {
      if (e.data?.message) {
        notification.error({ content: e.data.message, duration: 2000 })
      }
    }
  }

  const cancelDelete = () => {
    showDeleteModal.value = false
    deleteId.value = null
  }

  return {
    deleteId,
    showDeleteModal,
    deletePerson,
    cancelDelete
  }
}
