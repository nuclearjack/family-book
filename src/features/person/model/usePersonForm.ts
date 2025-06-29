/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UploadFileInfo, UploadSettledFileInfo } from 'naive-ui'
import type { FileUploadResponse } from '@shared/types'
import { usePersonStore } from '@entities/person'
import type { PersonFormData, PersonGalleryItem } from './types'
import { formToPayload, galleryToFiles, personToForm } from '../mappers'
import { defaultPersonData } from './defaults'

const loading = ref(false)
const errors = ref<{ [key: string]: any }>({})
const galleryData = ref<PersonGalleryItem[]>([])
const formData = ref<PersonFormData>(defaultPersonData())

export const usePersonForm = () => {
  const router = useRouter()
  const personStore = usePersonStore()
  const notification = useNotification()

  const createPersonHandler = async () => {
    loading.value = true
    errors.value = {}

    try {
      const payload = formToPayload(formData.value, galleryData.value)

      const res = await personStore.addPerson(payload)

      router.push(`/persons/${res.data.person.person_id}`)

      if (res.message) {
        notification.success({
          content: res.message,
          duration: 2000
        })
      }
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

  const updatePersonHandler = async () => {
    loading.value = true
    errors.value = {}

    try {
      const payload = formToPayload(formData.value, galleryData.value)

      const res = await personStore.updatePerson(payload)

      if (res.message) {
        notification.success({
          content: res.message,
          duration: 2000
        })
      }
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

  const uploadPosterFinishHandler = ({ event }: { event?: ProgressEvent }) => {
    loading.value = true

    try {
      const responseRaw = (event?.target as XMLHttpRequest)?.responseText ?? ''
      const res: FileUploadResponse = JSON.parse(responseRaw)

      if (res?.data) {
        formData.value.poster = {
          file_id: res.data.file_id,
          file_path: res.data.url
        }
        formData.value.new_poster = res.data.file_id
      }

      if (res?.message) {
        notification.success({
          content: res.message,
          duration: 2000
        })
      }
    } catch (e: any) {
      formData.value.poster = {
        file_id: null,
        file_path: ''
      }
      if (e.data.message) {
        notification.error({
          content: e.data.message,
          duration: 2000
        })
      }
    } finally {
      loading.value = false
    }
  }

  const uploadGalleryFinishHandler = ({ file, event }: {
    file: UploadSettledFileInfo & { file_id?: number },
    event?: ProgressEvent
  }) => {
    loading.value = true

    try {
      const responseRaw = (event?.target as XMLHttpRequest)?.responseText ?? ''
      const res: FileUploadResponse = JSON.parse(responseRaw)

      file.file_id = res.data.file_id

      const fileIx = galleryData.value.findIndex(g => g.id === file.id)

      if (fileIx >= 0) {
        galleryData.value[fileIx] = {
          ...galleryData.value[fileIx],
          file_id: res.data.file_id
        }
      }

      if (res?.message) {
        notification.success({
          content: res.message,
          duration: 2000
        })
      }
    } catch (e: any) {
      formData.value.poster = {
        file_id: null,
        file_path: ''
      }
      if (e.data.message) {
        notification.error({
          content: e.data.message,
          duration: 2000
        })
      }
    } finally {
      loading.value = false
    }
  }

  const uploadImageErrorHandler = ({ event }: {
    file: UploadSettledFileInfo & { file_id?: number },
    event?: ProgressEvent
  }) => {
    const responseRaw = (event?.target as XMLHttpRequest)?.responseText ?? ''
    const res: FileUploadResponse = JSON.parse(responseRaw)

    if (res.message) {
      notification.error({
        content: res.message,
        duration: 2000
      })
    }

    loading.value = false
  }

  const updateFileListHandler = (newList: UploadFileInfo[]) => {
    galleryData.value = newList.map(newFile => {
      const oldFile = galleryData.value.find(f => f.id === newFile.id)
      return oldFile && oldFile.file_id
        ? { ...newFile, file_id: oldFile.file_id }
        : newFile
    })
  }

  const removePosterButtonClickHandler = () => {
    formData.value.new_poster = null
    formData.value.poster = {
      file_id: null,
      file_path: ''
    }
  }

  const removePosterHandler = () => {
    formData.value.poster = {
      file_id: null,
      file_path: ''
    }
  }

  const removeGalleryItemHandler = (index: number) => {
    const fileId = galleryData.value[index]?.file_id
    if (fileId) {
      formData.value.delete_gallery = [
        ...formData.value.delete_gallery,
        fileId
      ]
    }
  }

  const initForm = async (userId: number) => {
    const { person } = await personStore.fetchPerson(Number(userId))
    formData.value = personToForm(person)
  }

  const initGallery = () => {
    galleryData.value = galleryToFiles(formData.value.gallery)
  }

  const reset = () => {
    formData.value = defaultPersonData()
    galleryData.value = []
    errors.value = {}
  }

  return {
    loading,
    errors,
    formData,
    galleryData,
    initForm,
    initGallery,
    reset,
    createPersonHandler,
    updatePersonHandler,
    uploadPosterFinishHandler,
    uploadGalleryFinishHandler,
    uploadImageErrorHandler,
    updateFileListHandler,
    removePosterButtonClickHandler,
    removeGalleryItemHandler,
    removePosterHandler
  }
}
