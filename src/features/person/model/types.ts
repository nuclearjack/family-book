import type { PersonImage } from '@entities/person'
import type { UploadFileInfo } from 'naive-ui'

export interface PersonFormData {
  user_id?: number
  person_id?: number
  name: string
  surname: string
  patronymic: string
  description: string
  relationship: string
  sex: 'male' | 'female' | 'other'
  poster: PersonImage
  gallery: PersonImage[]
  new_poster: number | null
  new_gallery: number[]
  delete_gallery: number[]
  birth_date: number | null
  death_date: number | null
  created_at: Date | null
  updated_at: Date | null
}

export type PersonGalleryItem = (UploadFileInfo & { file_id?: number })
