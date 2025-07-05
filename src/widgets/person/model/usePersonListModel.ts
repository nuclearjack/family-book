import { debounce } from 'lodash-es'
import { usePersonDelete, usePersonListFilters } from '@features/person'
import { usePersonStore } from '@entities/person'

export const usePersonListModel = () => {
  const route = useRoute()
  const store = usePersonStore()

  const { deleteId, showDeleteModal, deletePerson, cancelDelete } = usePersonDelete()
  const {
    currentPage,
    searchQuery,
    sortBy,
    sortOrder,
    updateUrl,
    syncParams
  } = usePersonListFilters()

  const fetchPersons = async () => {
    const params = {
      page: currentPage.value,
      limit: 8,
      search: searchQuery.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value as 'ASC' | 'DESC'
    }
    await store.fetchPersons(params)
    updateUrl()
  }

  const handleSearch = debounce(async () => {
    currentPage.value = 1
    await fetchPersons()
  }, 200)

  const handleSort = async () => {
    await fetchPersons()
  }

  const handlePageChange = async (event: number) => {
    currentPage.value = event
    await fetchPersons()
  }

  const handleShowDelete = (event: number) => {
    deleteId.value = event
    showDeleteModal.value = true
  }

  const handleDelete = async () => {
    await deletePerson()
    await fetchPersons()
  }

  const handleHideDelete = () => {
    cancelDelete()
  }

  // const preparePerson = (person: Person) => {
  //   return {
  //     ...person,
  //     birth_date: person.birth_date ? formatDate(person.birth_date) : 'Нет данных',
  //     death_date: person.death_date ? formatDate(person.death_date) : 'наши дни'
  //   }
  // }

  watch(
    () => route.query,
    async (newQuery) => syncParams(newQuery),
    { immediate: true }
  )

  onMounted(async () => await fetchPersons())

  return {
    showDeleteModal,
    handleSearch,
    handleSort,
    handlePageChange,
    handleShowDelete,
    handleHideDelete,
    handleDelete,
    fetchPersons
    // preparePerson
  }
}
