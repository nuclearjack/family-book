export interface PersonFormData {
  user_id?: number
  person_id?: number
  name: string
  surname: string
  patronymic: string
  description: string
  relationship: string
  sex: 'male' | 'female' | 'other'
  poster: {
    file_id: number | null
    file_path: string
  },
  new_poster: number | null
  gallery: {
    file_id: number
    file_path: string
  }[]
  new_gallery: number[]
  delete_gallery: number[]
  birth_date: number | null
  death_date: number | null
  created_at: Date | null
  updated_at: Date | null
}
