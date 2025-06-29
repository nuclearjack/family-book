import type {
  CreatePersonDto,
  UpdatePersonDto,
  GetPersonsDto,
  GetPersonResponse,
  GetPersonsResponse,
  CreatePersonResponse,
  UpdatePersonResponse,
  DeletePersonResponse
} from './types'

// Получение списка персон
export const getPersons = async (params: GetPersonsDto): Promise<GetPersonsResponse> => {
  const searchParams = new URLSearchParams()
  searchParams.append('page', params.page.toString())
  searchParams.append('limit', params.limit.toString())

  if (params.search) {
    searchParams.append('search', params.search)
  }
  if (params.sortBy) {
    searchParams.append('sortBy', params.sortBy)
  }
  if (params.sortOrder) {
    searchParams.append('sortOrder', params.sortOrder)
  }

  const response = await $fetch<GetPersonsResponse>(`/api/persons?${searchParams.toString()}`)
  return response
}

// Получение конкретной персоны
export const getPerson = async (personId: number): Promise<GetPersonResponse> => {
  const response = await $fetch<GetPersonResponse>(`/api/persons/${personId}`)
  return response
}

// Создание персоны
export const createPerson = async (data: CreatePersonDto): Promise<CreatePersonResponse> => {
  const response = await $fetch<CreatePersonResponse>('/api/persons', {
    method: 'PUT',
    body: data
  })
  return response
}

// Обновление персоны
export const updatePerson = async (data: UpdatePersonDto): Promise<UpdatePersonResponse> => {
  const response = await $fetch<UpdatePersonResponse>(`/api/persons/${data.person_id}`, {
    method: 'PATCH',
    body: data
  })
  return response
}

// Удаление персоны
export const deletePerson = async (personId: number): Promise<DeletePersonResponse> => {
  const response = await $fetch<DeletePersonResponse>(`/api/persons/${personId}`, {
    method: 'DELETE'
  })
  return response
}

export * from './types'
