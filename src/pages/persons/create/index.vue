<template>
  <div class="person-create-page w-full my-4">
    <div class="flex justify-between items-center mb-8">
      <div class="text-2xl font-medium text-gray-800">
        Новая биография
      </div>
      <n-button
        :loading="loading"
        :disabled="loading"
        type="primary"
        size="large"
        secondary
        @click="createPersonHandler"
      >
        <template #icon>
          <n-icon><add-circle-icon /></n-icon>
        </template>
        Сохранить
      </n-button>
    </div>
    <person-form />
  </div>
</template>

<script lang="ts" setup>
import { AddCircleOutline as AddCircleIcon } from '@vicons/ionicons5'
import { usePersonForm, PersonForm } from '@features/person'

useHead({
  title: 'Новая биография'
})

const { loading, createPersonHandler, reset } = usePersonForm()

onBeforeUnmount(() => reset())
</script>
