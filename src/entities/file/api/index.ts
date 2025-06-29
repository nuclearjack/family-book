import type { GetFilesResponse, UploadFileResponse } from './types'

export const fileApi = {
  // Получение всех файлов пользователя
  async getFiles (params?: {
    fileType?: string
    limit?: number
    offset?: number
  }): Promise<GetFilesResponse> {
    const searchParams = new URLSearchParams()

    if (params?.fileType) {
      searchParams.append('fileType', params.fileType)
    }
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString())
    }
    if (params?.offset) {
      searchParams.append('offset', params.offset.toString())
    }

    const response = await $fetch<GetFilesResponse>(`/api/files?${searchParams.toString()}`)
    return response
  },

  // Загрузка файла
  async uploadFile (file: globalThis.File): Promise<UploadFileResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch<UploadFileResponse>('/api/files/upload', {
      method: 'POST',
      body: formData
    })
    return response
  }
}

export * from './types'
