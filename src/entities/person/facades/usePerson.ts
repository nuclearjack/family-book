import { storeToRefs } from 'pinia'
import { usePersonStore } from '../model/store'

export const usePerson = () => {
  const store = usePersonStore()

  const {
    persons,
    pagination,
    isLoading,
    error
  } = storeToRefs(store)

  return {
    // State
    persons,
    pagination,
    isLoading,
    error,

    // Getters
    getPersonById: store.getPersonById,

    // Actions
    fetchPersons: store.fetchPersons,
    fetchPerson: store.fetchPerson,
    addPerson: store.addPerson,
    updatePerson: store.updatePerson,
    deletePerson: store.deletePerson
  }
}
