import type { PersonFormData } from './types'

export const defaultPersonData = (): PersonFormData => {
  return {
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
  }
}
