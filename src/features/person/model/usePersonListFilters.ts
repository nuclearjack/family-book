/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LocationQuery } from 'vue-router'

const DEFAULT_VALUES = {
  page: 1,
  search: '',
  sortBy: 'surname',
  sortOrder: 'ASC' as const
}

const currentPage = ref(DEFAULT_VALUES.page)
const searchQuery = ref(DEFAULT_VALUES.search)
const sortBy = ref(DEFAULT_VALUES.sortBy)
const sortOrder = ref<'ASC' | 'DESC'>(DEFAULT_VALUES.sortOrder)

export const usePersonListFilters = () => {
  const route = useRoute()
  const router = useRouter()

  currentPage.value = Number(route.query.page)
  searchQuery.value = route.query.search as string
  sortBy.value = route.query.sortBy as string
  sortOrder.value = route.query.sortOrder as 'ASC' | 'DESC'

  const resetParams = () => {
    currentPage.value = DEFAULT_VALUES.page
    searchQuery.value = DEFAULT_VALUES.search
    sortBy.value = DEFAULT_VALUES.sortBy
    sortOrder.value = DEFAULT_VALUES.sortOrder
  }

  const setParams = (newQuery: LocationQuery) => {
    currentPage.value = Number(newQuery.page) || DEFAULT_VALUES.page
    searchQuery.value = newQuery.search as string || DEFAULT_VALUES.search
    sortBy.value = newQuery.sortBy as string || DEFAULT_VALUES.sortBy
    sortOrder.value = newQuery.sortOrder as 'ASC' | 'DESC' || DEFAULT_VALUES.sortOrder
  }

  const syncParams = (newQuery: LocationQuery) => {
    if (!Object.keys(newQuery).length) {
      resetParams()
    } else {
      setParams(newQuery)
    }
  }

  const updateUrl = () => {
    const queryParams: any = {}
    if (currentPage.value !== DEFAULT_VALUES.page) queryParams.page = currentPage.value
    if (searchQuery.value !== DEFAULT_VALUES.search) queryParams.search = searchQuery.value
    if (sortBy.value !== DEFAULT_VALUES.sortBy) queryParams.sortBy = sortBy.value
    if (sortOrder.value !== DEFAULT_VALUES.sortOrder) queryParams.sortOrder = sortOrder.value
    router.push({ query: queryParams })
  }

  return {
    currentPage,
    searchQuery,
    sortBy,
    sortOrder,
    syncParams,
    updateUrl
  }
}
