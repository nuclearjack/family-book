<template>
  <n-card
    class="max-w-md mx-auto p-0"
    title="Авторизация"
  >
    <n-form
      :model="formData"
      class="flex flex-col gap-4"
      @submit.prevent="$emit('submit', formData)"
    >
      <n-form-item
        label="Никнейм"
        path="nickname"
        :validation-status="errors.nickname ? 'error' : undefined"
        :feedback="errors.nickname || ''"
        :show-feedback="!!errors.nickname"
      >
        <n-input
          v-model:value="formData.nickname"
          placeholder="Введите никнейм"
          size="large"
          clearable
        />
      </n-form-item>
      <n-form-item
        label="Пароль"
        path="password"
        :validation-status="errors.password ? 'error' : undefined"
        :feedback="errors.password || ''"
        :show-feedback="!!errors.password"
      >
        <n-input
          v-model:value="formData.password"
          placeholder="Введите пароль"
          type="password"
          size="large"
          clearable
        />
      </n-form-item>
      <div class="flex mt-2">
        <n-button
          type="info"
          attr-type="submit"
          class="!w-full"
          size="large"
          secondary
        >
          Войти
        </n-button>
      </div>
    </n-form>

    <slot name="form-bottom" />
  </n-card>
</template>

<script setup lang="ts">
import { useLogin } from '../model/useLogin'

const { formData, errors } = useLogin()

defineEmits(['submit'])
</script>
