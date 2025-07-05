<template>
  <div class="flex flex-col min-h-screen bg-[rgb(255,251,235,0.3)]">
    <header class="flex justify-between items-center px-4 md:px-8 py-3 !bg-theme-primary text-white">
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

    <footer class="px-4 md:px-8 py-4 mt-auto bg-theme-primary text-white">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base md:text-lg">
        <div class="text-center sm:text-left">Family Book App</div>
        <div class="text-center">Made by NuclearKek</div>
        <div class="text-center sm:text-right">{{ new Date().getFullYear() }}</div>
      </div>
    </footer>
  </div>
</template>
