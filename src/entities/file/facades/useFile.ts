import { useFileStore } from '../model/store'
import { storeToRefs } from 'pinia'

export const useFile = () => {
  const store = useFileStore()
  const { files, isLoading, error, pagination } = storeToRefs(store)

  const fetchFiles = async (params?: {
    fileType?: string
    limit?: number
    offset?: number
  }) => {
    return await store.fetchFiles(params)
  }

  const uploadFile = async (file: globalThis.File) => {
    return await store.uploadFile(file)
  }

  return {
    // State
    files,
    isLoading,
    error,
    pagination,

    // Getters
    getFileById: store.getFileById,

    // Actions
    fetchFiles,
    uploadFile
  }
}
