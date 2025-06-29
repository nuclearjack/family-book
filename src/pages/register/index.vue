<template>
  <register-form
    class="my-4"
    @submit="register"
  />
</template>

<script lang="ts" setup>
import { RegisterForm, useRegister } from '@features/auth'

useHead({
  title: 'Регистрация'
})

const { register, reset } = useRegister()

onBeforeMount(() => reset())
</script>
