<template>
  <div class="person-edit-page w-full my-4">
    <div class="flex flex-wrap gap-4 justify-between items-center mb-8">
      <div class="text-2xl font-medium text-gray-800">
        Редактирование
      </div>
      <div class="flex gap-2">
        <n-button
          type="info"
          size="large"
          secondary
          @click="$router.push(`/persons/${$route.params.id}`)"
        >
          <template #icon>
            <n-icon><view-circle-icon /></n-icon>
          </template>
          Просмотр
        </n-button>
        <n-button
          :loading="loading"
          :disabled="loading"
          type="primary"
          size="large"
          secondary
          @click="updatePersonHandler"
        >
          <template #icon>
            <n-icon><edit-icon /></n-icon>
          </template>
          Сохранить
        </n-button>
      </div>
    </div>
    <person-form />
  </div>
</template>

<script lang="ts" setup>
import {
  PersonCircleOutline as ViewCircleIcon,
  SaveOutline as EditIcon
} from '@vicons/ionicons5'
import { usePersonForm, PersonForm } from '@features/person'

useHead({
  title: 'Редактирование'
})

const route = useRoute()
const {
  loading, formData, updatePersonHandler, reset, initGallery, initForm
} = usePersonForm()

onMounted(async () => {
  if (route.params.id) {
    await initForm(Number(route.params.id))
    if (formData.value.gallery.length) {
      initGallery()
    }
  }
})

onBeforeUnmount(() => reset())
</script>
