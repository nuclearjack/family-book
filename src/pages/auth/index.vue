<template>
  <auth-form
    class="my-20"
    @submit="login"
  >
    <template #form-bottom>
      <n-button
        type="primary"
        size="small"
        class="!mt-4"
        secondary
        @click="showInfoModal = true"
      >
        <!-- @click="showInfoModal = true" -->
        <template #icon>
          <n-icon><info-icon /></n-icon>
        </template>
        Как зарегистрироваться?
      </n-button>
      <n-modal
        v-model:show="showInfoModal"
        style="max-width: 560px;"
      >
        <n-card title="Регистрация">
          В данный момент регистрация закрыта.
          Вы можете связаться с разработчиком для получения доступа.
          <template #footer>
            <div class="flex gap-2">
              <n-button
                size="large"
                secondary
                class="flex-grow"
                @click="showInfoModal = false"
              >
                Понятно
              </n-button>
              <n-button
                type="info"
                size="large"
                secondary
                class="flex-grow"
                @click="showInfoModal = false"
              >
                Хорошо
              </n-button>
            </div>
          </template>
        </n-card>
      </n-modal>
    </template>
  </auth-form>
</template>

<script lang="ts" setup>
import { InformationCircleOutline as InfoIcon } from '@vicons/ionicons5'
import { AuthForm, useLogin } from '@features/auth'

definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Авторизация'
})

const { login, reset } = useLogin()
const showInfoModal = ref(false)

onBeforeMount(() => reset())
</script>
