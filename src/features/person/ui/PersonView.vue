<template>
  <n-form ref="formRef" :model="formData">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Основная информация -->
      <n-card class="hover:shadow-lg transition-shadow duration-300 h-full">
        <div class="text-xl font-medium text-gray-800 mb-5">Основная информация</div>
        <div class="space-y-2">
          <n-form-item
            :show-feedback="false"
            label="Пол"
            path="sex"
            size="large"
          >
            <n-radio-group
              :value="formData.sex"
              name="radiogroup"
            >
              <n-space>
                <n-radio
                  v-for="sex in SEXES"
                  :key="sex.value"
                  :disabled="sex.value !== formData.sex"
                  :value="sex.value"
                  :label="sex.label"
                />
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item
            v-if="formData.name"
            :show-feedback="false"
            label="Имя"
            size="large"
          >
            <n-input
              v-model:value="formData.name"
              size="large"
              readonly
            />
          </n-form-item>
          <n-form-item
            v-if="formData.surname"
            :show-feedback="false"
            label="Фамилия"
            size="large"
          >
            <n-input
              v-model:value="formData.surname"
              size="large"
              readonly
            />
          </n-form-item>
          <n-form-item
            v-if="formData.patronymic"
            :show-feedback="false"
            label="Отчество"
            size="large"
          >
            <n-input
              v-model:value="formData.patronymic"
              size="large"
              readonly
            />
          </n-form-item>
          <n-form-item
            v-if="formData.relationship"
            :show-feedback="false"
            label="Кем приходится"
            size="large"
          >
            <n-input
              v-model:value="formData.relationship"
              size="large"
              readonly
            />
          </n-form-item>
          <n-form-item
            v-if="formData.birth_date"
            :show-feedback="false"
            label="Дата рождения"
            size="large"
          >
            <n-date-picker
              v-model:value="formData.birth_date"
              type="date"
              format="dd.MM.yyyy"
              size="large"
              class="w-full"
              disabled
            />
          </n-form-item>
          <n-form-item
            v-if="formData.death_date"
            :show-feedback="false"
            label="Дата смерти"
            size="large"
          >
            <n-date-picker
              v-model:value="formData.death_date"
              type="date"
              format="dd.MM.yyyy"
              size="large"
              class="w-full"
              disabled
            />
          </n-form-item>
        </div>
      </n-card>
    <!-- Фото -->
      <n-card class="hover:shadow-lg transition-shadow duration-300 h-full">
        <div class="text-xl font-medium text-gray-800 mb-5">Фото</div>
        <n-form-item
          v-if="formData.poster"
          :show-feedback="false"
          label="Основное фото"
          size="large"
        >
          <div class="w-full flex justify-center p-6">
            <img
              v-if="formData.poster.file_path"
              :src="formData.poster.file_path"
              class="bg-white object-contain h-80"
              alt="Person photo"
            >
          </div>
        </n-form-item>
        <span v-else>Нет основного фото</span>
      </n-card>
          <!-- Подробная информация -->
      <div class="md:col-span-2">
        <n-card class="hover:shadow-lg transition-shadow duration-300">
          <div class="text-lg font-medium text-gray-700 mb-5">
            Подробная информация
          </div>
          <n-form-item
            v-if="formData.description"
            :show-feedback="false"
            label="Биография"
            size="large"
          >
            <n-input
              v-model:value="formData.description"
              :autosize="{ minRows: 10 }"
              type="textarea"
              size="large"
              placeholder="Расскажите подробнее о человеке..."
              class="mb-4"
              readonly
            />
          </n-form-item>
          <span v-else>Информация не указана</span>
        </n-card>
      </div>
      <!-- Галерея -->
      <div class="md:col-span-2">
        <n-card class="hover:shadow-lg transition-shadow duration-300">
          <div class="text-lg font-medium text-gray-700 mb-5">
            Галерея
          </div>
          <n-image-group>
            <div
              v-if="formData.gallery?.length"
              class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <div
                v-for="galleryItem in displayedGallery"
                :key="galleryItem.file_id!"
              >
                <n-image
                  :src="galleryItem.file_path"
                  :img-props="{
                    class: 'h-[300px] w-full'
                  }"
                  object-fit="cover"
                  class="w-full"
                  height="300"
                  width="100%"
                />
              </div>
            </div>
            <div v-if="formData.gallery?.length > displayedCount" class="flex justify-center mt-6 mb-2">
              <n-button
                type="info"
                secondary
                size="large"
                @click="loadMoreGallery"
              >
                Показать еще ({{ formData.gallery.length - displayedCount }})
              </n-button>
            </div>
            <div
              v-if="displayedGallery?.length > DISPLAYED_PERSONS_COUNT"
              class="flex justify-center mt-6 mb-2"
            >
              <n-button
                type="info"
                secondary
                size="large"
                @click="displayedCount = DISPLAYED_PERSONS_COUNT"
              >
                Скрыть
              </n-button>
            </div>
            <span v-else-if="!formData.gallery?.length">Нет фото в галерее</span>
          </n-image-group>
        </n-card>
      </div>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { DISPLAYED_PERSONS_COUNT, ADD_PERSONS_COUNT, SEXES } from '../config'
import { usePersonForm } from '../model'

const { formData } = usePersonForm()

const displayedCount = ref(DISPLAYED_PERSONS_COUNT)

const displayedGallery = computed(() => {
  return formData.value.gallery?.slice(0, displayedCount.value) || []
})

const loadMoreGallery = () => {
  displayedCount.value += ADD_PERSONS_COUNT
}
</script>
