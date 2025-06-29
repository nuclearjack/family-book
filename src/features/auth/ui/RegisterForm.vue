<template>
  <n-card
    class="max-w-md mx-auto p-0"
    title="Регистрация"
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
      <n-form-item
        label="Повторите пароль"
        path="passwordRepeat"
        :validation-status="errors.passwordRepeat ? 'error' : undefined"
        :feedback="errors.passwordRepeat || ''"
        :show-feedback="!!errors.passwordRepeat"
      >
        <n-input
          v-model:value="formData.passwordRepeat"
          placeholder="Повторите пароль"
          type="password"
          size="large"
          clearable
        />
      </n-form-item>
      <n-form-item
        label="Имя"
        path="name"
        :validation-status="errors.name ? 'error' : undefined"
        :feedback="errors.name || ''"
        :show-feedback="!!errors.name"
      >
        <n-input
          v-model:value="formData.name"
          placeholder="Введите имя (необязательно)"
          size="large"
          clearable
        />
      </n-form-item>
      <n-form-item
        label="Фамилия"
        path="surname"
        :validation-status="errors.surname ? 'error' : undefined"
        :feedback="errors.surname || ''"
        :show-feedback="!!errors.surname"
      >
        <n-input
          v-model:value="formData.surname"
          placeholder="Введите фамилию (необязательно)"
          size="large"
          clearable
        />
      </n-form-item>
      <n-form-item
        label="Отчество"
        path="patronymic"
        :validation-status="errors.patronymic ? 'error' : undefined"
        :feedback="errors.patronymic || ''"
        :show-feedback="!!errors.patronymic"
      >
        <n-input
          v-model:value="formData.patronymic"
          placeholder="Введите отчество (необязательно)"
          size="large"
          clearable
        />
      </n-form-item>
      <div class="flex mt-2">
        <n-button
          type="info"
          class="!w-full"
          size="large"
          attr-type="submit"
          secondary
        >
          Зарегистрировать
        </n-button>
      </div>
    </n-form>
    <slot name="form-bottom" />
  </n-card>
</template>

<script setup lang="ts">
import { useRegister } from '../model/useRegister'

const { formData, errors } = useRegister()

defineEmits(['submit'])
</script>
