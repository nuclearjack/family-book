/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UploadFileInfo, UploadSettledFileInfo } from 'naive-ui'
import type { FileUploadResponse } from '@shared/types'
import { usePersonStore } from '@entities/person'
import type { PersonFormData } from './types'

const loading = ref(false)
const errors = ref<{ [key: string]: any }>({})
const galleryData = ref<(UploadFileInfo & { file_id?: number })[]>([])
const formData = ref<PersonFormData>({
  relationship: '',
  name: '',
  surname: '',
  patronymic: '',
  birth_date: null,
  death_date: null,
  description: '',
  sex: 'male',
  poster: {
    file_id: null,
    file_path: ''
  },
  new_poster: null,
  gallery: [],
  delete_gallery: [],
  new_gallery: [],
  created_at: null,
  updated_at: null
})

export const usePersonForm = () => {
  const router = useRouter()
  const personStore = usePersonStore()
  const notification = useNotification()

  const createPersonHandler = async () => {
    loading.value = true
    errors.value = {}

    try {
      const {
        created_at: createdAt,
        updated_at: updatedAt,
        poster,
        gallery,
        ...rest
      } = formData.value

      const payload = { ...rest }

      payload.new_gallery = galleryData.value.map(g => g.file_id as number)

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
      const {
        created_at: createdAt,
        updated_at: updatedAt,
        poster,
        gallery,
        ...rest
      } = formData.value

      const payload = { ...rest }

      payload.new_gallery = galleryData.value.map(g => g.file_id as number)

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

  const initForm = async (userId: number) => {
    const { person } = await personStore.fetchPerson(Number(userId))
    formData.value = {
      ...person,
      birth_date: person.birth_date ? new Date(person.birth_date).getTime() : null,
      death_date: person.death_date ? new Date(person.death_date).getTime() : null,
      delete_gallery: [],
      new_gallery: [],
      new_poster: null,
      poster: person.poster
        ? person.poster
        : {
            file_id: null,
            file_path: ''
          }
    }
  }

  const initGallery = () => {
    galleryData.value = formData.value.gallery.map(file => ({
      id: String(file.file_id!),
      file_id: file.file_id!,
      name: file.file_path,
      status: 'finished',
      url: file.file_path
    }))
  }

  const reset = () => {
    errors.value = {}
    galleryData.value = []
    formData.value = {
      relationship: '',
      name: '',
      surname: '',
      patronymic: '',
      birth_date: null,
      death_date: null,
      poster: {
        file_id: null,
        file_path: ''
      },
      new_poster: null,
      gallery: [],
      new_gallery: [],
      delete_gallery: [],
      description: '',
      sex: 'male',
      created_at: null,
      updated_at: null
    }
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
    updateFileListHandler
  }
}
