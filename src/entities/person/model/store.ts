import { defineStore } from 'pinia'
import type { PaginationInfo } from '@shared/types'
import {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} from '../api'
import type {
  Person,
  CreatePersonDto,
  UpdatePersonDto,
  GetPersonsDto,
  GetPersonsResponse,
  CreatePersonResponse,
  UpdatePersonResponse,
  DeletePersonResponse,
  GetPersonResponse
} from '../api/types'

interface PersonState {
  persons: Person[]
  person: Person | null
  pagination: PaginationInfo | null
  isLoading: boolean
  error: string | null
}

export const usePersonStore = defineStore('person', {
  state: (): PersonState => ({
    persons: [],
    person: null,
    pagination: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getPersonById: (state) => (personId: number) => {
      return state.persons.find(person => person.person_id === personId)
    }
  },

  actions: {
    async fetchPersons (params: GetPersonsDto) {
      this.isLoading = true
      this.error = null

      try {
        const { data }: GetPersonsResponse = await getPersons(params)
        this.persons = data.persons
        this.pagination = data.pagination
        return data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка при загрузке персон'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchPerson (personId: number) {
      this.isLoading = true
      this.error = null

      try {
        const { data }: GetPersonResponse = await getPerson(personId)
        this.person = data.person
        return data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка при загрузке персоны'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async addPerson (personData: CreatePersonDto) {
      this.isLoading = true
      this.error = null

      try {
        const response: CreatePersonResponse = await createPerson(personData)
        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка при создании персоны'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updatePerson (personData: UpdatePersonDto) {
      this.isLoading = true
      this.error = null

      try {
        const response: UpdatePersonResponse = await updatePerson(personData)
        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка при обновлении персоны'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async deletePerson (id: number) {
      this.isLoading = true
      this.error = null

      try {
        const response: DeletePersonResponse = await deletePerson(id)
        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка при удалении персоны'
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
