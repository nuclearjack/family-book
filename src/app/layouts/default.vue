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
          <!-- Family Book -->
        </nuxt-link>

        <n-menu
          :options="menuOptions"
          :value="$route.path"
          mode="horizontal"
          class="!text-[18px]"
          @update:value="$route.path !== $event && $router.push($event)"
        />
      </div>

      <div class="flex items-center">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              color="white"
              class="!ml-4 !px-2.5"
              @click="logout"
            >
            <template #icon>
              <n-icon size="24px">
                <logout-icon color="black" />
              </n-icon>
            </template>
            </n-button>
          </template>
          Выход из системы
        </n-tooltip>
      </div>
      <!-- <p class="text-lg">
        Сохраняйте и передавайте историю вашей семьи из поколения в поколение
      </p> -->
    </header>

    <n-divider class="!m-0" />

    <div class="container mx-auto p-4">
      <slot />
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

<script lang="ts" setup>
import { LogOut as LogoutIcon } from '@vicons/ionicons5'
import { useLogout } from '@features/auth'
import { menuOptions } from '../config'

const { logout } = useLogout()
</script>
