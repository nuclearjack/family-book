export interface File {
  file_id: number
  user_id: number
  original_name: string
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  file_type: 'image' | 'document' | 'video' | 'audio'
  width?: number
  height?: number
  uploaded_at: string
}

export interface UploadFileResponse {
  message: string
  data: {
    file_id: number
    url: string
    original_name: string
    file_size: number
    mime_type: string
    file_type: string
  }
}

export interface GetFilesResponse {
  files: File[]
  total: number
  limit: number
  offset: number
}
