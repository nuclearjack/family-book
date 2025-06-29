import type { PaginationInfo } from '@shared/types'
// import type { File } from '@entities/file'

export type Sex = 'male' | 'female'

export interface PersonImage {
  file_id: number | null
  file_path: string
}

export interface Person {
  person_id: number
  user_id: number
  name: string
  surname: string
  patronymic: string
  relationship: string
  birth_date: string | null
  death_date: string | null
  description: string
  sex: 'male' | 'female' | 'other'
  poster: PersonImage | null
  new_poster: number | null
  delete_gallery: number[]
  new_gallery: number[]
  gallery: PersonImage[]
  created_at: Date
  updated_at: Date
}

export interface CreatePersonDto {
  name: string
  surname: string
  patronymic: string
  relationship: string
  birth_date?: number | null
  death_date?: number | null
  description: string
  sex: string
  poster_id?: number | null
}

export interface UpdatePersonDto extends Partial<CreatePersonDto> {
  person_id?: number
}

export interface GetPersonResponse {
  message?: string
  data: {
    person: Person
  }
}

export interface GetPersonsResponse {
  message?: string
  data: {
    persons: Person[]
    pagination: PaginationInfo
  }
}

export interface GetPersonsDto {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
}

export interface CreatePersonResponse {
  message: string
  data: {
    person: Person
  }
}

export interface UpdatePersonResponse {
  message: string
  data: {
    person: Person
  }
}

export interface DeletePersonResponse {
  message: string
  data: { deleted: boolean }
}

// export interface PersonFile {
//   person_file_id: number
//   person_id: number
//   file_id: number
//   is_main: boolean
//   sort_order: number
//   added_at: string
//   file?: File
// }
