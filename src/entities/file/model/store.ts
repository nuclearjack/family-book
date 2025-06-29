import { defineStore } from 'pinia'
import * as fileApi from '../api'
import type { File, GetFilesResponse } from '../api'

interface FileState {
  files: File[]
  isLoading: boolean
  error: string | null
  pagination: {
    total: number
    limit: number
    offset: number
  } | null
}

export const useFileStore = defineStore('file', {
  state: (): FileState => ({
    files: [],
    isLoading: false,
    error: null,
    pagination: null
  }),

  getters: {
    getFileById: (state) => (fileId: number) => {
      return state.files.find(file => file.file_id === fileId)
    }
  },

  actions: {
    async fetchFiles (params?: {
      fileType?: string
      limit?: number
      offset?: number
    }) {
      this.isLoading = true
      this.error = null

      try {
        const response: GetFilesResponse = await fileApi.fileApi.getFiles(params)
        this.files = response.files
        this.pagination = {
          total: response.total,
          limit: response.limit,
          offset: response.offset
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка при загрузке файлов'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async uploadFile (file: globalThis.File) {
      this.isLoading = true
      this.error = null

      try {
        const response = await fileApi.fileApi.uploadFile(file)
        // Добавляем новый файл в список
        const newFile: File = {
          file_id: response.data.file_id,
          user_id: 0, // Будет заполнено сервером
          original_name: response.data.original_name,
          file_name: '',
          file_path: response.data.url,
          file_size: response.data.file_size,
          mime_type: response.data.mime_type,
          file_type: response.data.file_type as File['file_type'],
          uploaded_at: new Date().toISOString()
        }
        this.files.unshift(newFile)
        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка при загрузке файла'
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
