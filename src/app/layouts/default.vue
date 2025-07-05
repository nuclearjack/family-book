<template>
  <div class="flex flex-col min-h-screen bg-[rgb(255,251,235,0.3)]">
    <header class="flex justify-between items-center px-4 md:px-8 py-3 bg-theme-primary text-white">
      <div class="flex items-center gap-5">
        <nuxt-link
          to="/"
          class="hidden md:block flex flex-shrink-0
            hover:underline items-center gap-x-2 text-xl font-semibold"
        >
          <img
            src="/logo.jpg"
            class="w-[40px] h-[40px] rounded-[6px]"
            alt="Лого"
          >
          <!-- Family Book -->
        </nuxt-link>

        <!-- Desktop menu -->
         <div class="hidden md:block">
          <n-menu
            :options="menuOptions"
            :value="$route.path"
            :theme-overrides="mainMenuTheme"
            mode="horizontal"
            class="!text-[18px] "
            @update:value="$route.path !== $event && $router.push($event)"
          />
         </div>

        <!-- Mobile burger -->
        <div class="md:hidden">
          <n-button
            color="white"
            class="!-ml-2"
            quaternary
            @click="showMobileMenu = true"
          >
            <template #icon>
              <n-icon size="24">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </n-icon>
            </template>
          </n-button>
        </div>
        <n-drawer v-model:show="showMobileMenu" placement="left" width="220" class="md:hidden">
          <n-drawer-content title="Меню">
            <n-menu
              :options="menuOptionsMobile"
              :value="$route.path"
              mode="vertical"
              color="black"
              class="mobile-menu"
              @update:value="handleMobileMenuSelect"
            />
          </n-drawer-content>
        </n-drawer>
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

    <footer class="px-4 md:px-8 py-4 mt-auto bg-theme-primary text-white">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base md:text-lg">
        <div class="text-center sm:text-left">Family Book App</div>
        <div class="text-center">Made by NuclearKek</div>
        <div class="text-center sm:text-right">{{ new Date().getFullYear() }}</div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { LogOut as LogoutIcon } from '@vicons/ionicons5'
import { useLogout } from '@features/auth'
import { menuOptions, menuOptionsMobile, mainMenuTheme } from '../config'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const { logout } = useLogout()
const showMobileMenu = ref(false)
const router = useRouter()
const route = useRoute()

const handleMobileMenuSelect = (path: string) => {
  showMobileMenu.value = false
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<style>
.n-menu .n-menu-item-content::before {
  left: 0;
}
</style>
