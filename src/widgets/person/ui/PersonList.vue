<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 !gap-6 mb-8">
      <n-input
        v-model:value="searchQuery"
        placeholder="Поиск"
        class="flex-1"
        size="large"
        clearable
        @input="handleSearch"
      >
        <template #prefix>
          <n-icon><search-icon /></n-icon>
        </template>
      </n-input>

      <div class="flex gap-y-2 gap-x-4">
        <n-select
          v-model:value="sortBy"
          :options="sortOptions"
          placeholder="Сортировка"
          class="!w-1/2"
          size="large"
          @update:value="handleSort"
        />

        <n-select
          v-model:value="sortOrder"
          :options="sortOrderOptions"
          placeholder="Порядок"
          class="!w-1/2"
          size="large"
          @update:value="handleSort"
        />
      </div>

      <div class="hidden xl:block" />

      <div class="flex ml-auto">
        <n-button
          type="info"
          size="large"
          class="!w-auto"
          secondary
          @click="$router.push('/persons/create')"
        >
          <template #icon>
            <n-icon><add-circle-icon /></n-icon>
          </template>
          Добавить биографию
        </n-button>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
    </div>

    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <div v-else-if="pagination?.totalItems">
      <div
        v-if="persons?.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 !gap-6"
      >
        <person-card
          v-for="person in persons"
          :key="person.person_id"
          :person="preparePerson(person)"
          @click:image="$router.push(`/persons/${person.person_id}`)"
          @delete="handleShowDelete"
          @update="$router.push(`/persons/edit/${$event}`)"
        />

        <person-delete-modal
          v-model="showDeleteModal"
          @cancel="handleHideDelete"
          @confirm="handleDelete"
        />
      </div>

      <span v-else>Нет записей</span>

      <div
        v-if="pagination?.totalPages > 1"
        class="mt-8 mb-4 flex justify-center"
      >
        <n-pagination
          v-model:page="currentPage"
          :page-count="pagination.totalPages"
          :page-slot="10"
          size="large"
          @update:page="handlePageChange"
        />
      </div>
    </div>

    <span v-else>Нет записей</span>
  </div>
</template>

<script setup lang="ts">
import { PersonCard, usePersonStore } from '@entities/person'
import { usePersonListModel, sortOptions, sortOrderOptions } from '@widgets/person'
import { usePersonDelete, usePersonListFilters } from '@features/person'
import {
  SearchOutline as SearchIcon,
  AddCircleOutline as AddCircleIcon
} from '@vicons/ionicons5'
import PersonDeleteModal from '@features/person/ui/PersonDeleteModal.vue'

const store = usePersonStore()
const { persons, isLoading, error, pagination } = storeToRefs(store)

const { showDeleteModal } = usePersonDelete()
const { currentPage, searchQuery, sortBy, sortOrder } = usePersonListFilters()
const {
  handleSearch,
  handleSort,
  handlePageChange,
  handleShowDelete,
  handleHideDelete,
  handleDelete,
  preparePerson
} = usePersonListModel()
</script>
