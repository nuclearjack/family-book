<template>
  <div class="flex flex-col min-h-screen bg-[rgb(255,251,235,0.3)]">
    <header class="flex justify-between items-center px-8 py-3 !bg-theme-primary text-white">
      <div class="text-xl font-semibold">
        <div class="flex items-center gap-x-2">
          <img
            src="/logo.jpg"
            class="w-[40px] h-[40px] rounded-[6px]"
            alt="Лого"
          >
          Family Book
        </div>
      </div>
    </header>

    <n-divider class="!m-0" />

    <div class="container mx-auto flex p-4">
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
          <span>
            Family Book App
          </span>
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
