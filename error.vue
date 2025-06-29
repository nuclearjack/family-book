<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex flex-col min-h-screen bg-[rgb(255,251,235,0.3)]">
    <header class="flex justify-between items-center px-8 py-3 bg-theme-primary text-white">
      <div class="flex items-center gap-5">
        <nuxt-link
          to="/"
          class="flex flex-shrink-0 hover:underline items-center gap-x-2 text-xl font-semibold"
        >
          <img
            src="/logo.jpg"
            class="w-[40px] h-[40px] rounded-[6px]"
            alt="Лого"
          >
          Family Book
        </nuxt-link>
      </div>

    </header>

    <n-divider class="!m-0" />

    <div class="container mx-auto p-4">
      <div class="flex flex-col gap-2 items-center text-center justify-center my-20">
        <div class="text-6xl font-bold text-gray-300 mb-4">
          {{ error?.statusCode || 404 }}
        </div>
        <h1 class="text-2xl font-semibold text-gray-800 mb-4">
          {{ error?.statusMessage || 'Страница не найдена' }}
        </h1>
        <!-- <p class="text-gray-600 mb-8 max-w-md">
          {{ error?.message || 'Запрашиваемая страница не существует или была перемещена.' }}
        </p> -->
        <div class="flex gap-4">
          <n-button
            type="primary"
            color="#00403d"
            secondary
            size="large"
            @click="handleError"
          >
            Вернуться на главную
          </n-button>
          <n-button
            type="info"
            color="#a65f00"
            size="large"
            secondary
            @click="goBack"
          >
            Назад
          </n-button>
        </div>
      </div>
    </div>

    <footer class="px-8 py-4 mt-auto bg-theme-primary text-white">
      <n-grid
        cols="3"
        x-gap="24"
        y-gap="24"
        class="text-lg"
      >
        <n-gi>
          <div class="text-lg">
            Family Book App
          </div>
        </n-gi>
        <n-gi class="text-center">
          <span>
            Made by NuclearKek
          </span>
        </n-gi>
        <n-gi class="text-right">
          <span>
            {{ new Date().getFullYear() }}
          </span>
        </n-gi>
      </n-grid>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface ErrorProps {
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}

defineProps<ErrorProps>()

const handleError = () => {
  clearError({ redirect: '/' })
}

const goBack = () => {
  if (import.meta.client) {
    window.history.back()
  }
}
</script>
