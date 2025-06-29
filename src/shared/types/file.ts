export interface FileUploadResponse {
  data: {
    file_id: number
    file_size: number
    file_type: string
    mime_type: string
    original_name: string
    url: string
  }
  message: string
}
