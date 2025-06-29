<template>
  <div class="my-10 flex flex-col items-center text-center gap-8 w-full">
    <img
      src="/logo.jpg"
      alt="Логотип"
      class="w-24 h-24 rounded-[6px] shadow"
    >
    <h1 class="text-3xl font-semibold text-gray-800">
      Family Book
    </h1>
    <p class="text-lg text-gray-600 max-w-3xl">
      Добро пожаловать в приложение для сохранения биографий ваших родственников и знакомых!
      Здесь вы можете создавать и хранить истории жизни близких людей, а в будущем — выстраивать генеалогическое древо семьи.
      <br>
      Сохраняйте память о прошлом и передавайте её будущим поколениям.
    </p>
    <div class="flex flex-wrap justify-center gap-3 mt-4">
      <n-button
        type="primary"
        size="large"
        class="!w-50"
        secondary
        @click="$router.push('/persons/create')"
      >
        <template #icon>
          <n-icon><add-circle-icon /></n-icon>
        </template>
        Новая биография
      </n-button>
      <n-button
        type="info"
        size="large"
        class="!w-50"
        secondary
          @click="$router.push('/persons')"
      >
        <template #icon>
          <n-icon><persons-icon /></n-icon>
        </template>
        К биографиям
      </n-button>
      <n-button
        v-if="isAdmin"
        type="error"
        size="large"
        class="!w-50"
        secondary
          @click="$router.push('/register')"
      >
        <template #icon>
          <n-icon><register-icon /></n-icon>
        </template>
        Регистрация
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@entities/auth'
import {
  AddCircleOutline as AddCircleIcon,
  BookOutline as PersonsIcon,
  PersonAdd as RegisterIcon
} from '@vicons/ionicons5'

useHead({
  title: 'Family Book'
})

const authStore = useAuthStore()
const { isAdmin } = storeToRefs(authStore)
</script>
