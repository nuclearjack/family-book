<template>
  <div class="person-view-page w-full my-4">
    <div class="flex flex-wrap gap-4 justify-between items-center mb-8">
      <div class="text-2xl font-medium text-gray-800">
        Просмотр
      </div>
      <n-button
        type="primary"
        size="large"
        secondary
        @click="$router.push(`/persons/edit/${$route.params.id}`)"
      >
        <template #icon>
          <n-icon><edit-icon /></n-icon>
        </template>
        Редактировать
      </n-button>
    </div>

    <person-view />
  </div>
</template>

<script lang="ts" setup>
import { PencilOutline as EditIcon } from '@vicons/ionicons5'
import { usePersonForm, PersonView } from '@features/person'

useHead({
  title: 'Биографиия'
})

const route = useRoute()
const { reset, initForm } = usePersonForm()

onMounted(async () => {
  if (route.params.id) {
    await initForm(Number(route.params.id))
  }
})

onBeforeUnmount(() => reset())
</script>
