<template>
  <n-form ref="formRef" :model="formData">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card class="hover:shadow-lg transition-shadow duration-300 h-full">
        <div class="text-xl font-medium text-gray-800 mb-5">Основная информация</div>
          <div class="space-y-2">
            <n-form-item
              :validation-status="errors.sex && 'error'"
              :feedback="errors.sex || ''"
              :show-feedback="!!errors.sex"
              label="Пол"
              path="sex"
              size="large"
            >
              <n-radio-group
                v-model:value="formData.sex"
                name="radiogroup"
              >
                <n-space>
                  <n-radio
                    v-for="sex in SEXES"
                    :key="sex.value"
                    :value="sex.value"
                    :label="sex.label"
                  />
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item
              :validation-status="errors.surname && 'error'"
              :feedback="errors.surname || ''"
              :show-feedback="!!errors.surname"
              label="Фамилия"
              path="surname"
              size="large"
              required
            >
              <n-input
                v-model:value="formData.surname"
                size="large"
                placeholder="Фамилия"
                clearable
              />
            </n-form-item>
            <n-form-item
              :validation-status="errors.name && 'error'"
              :feedback="errors.name || ''"
              :show-feedback="!!errors.name"
              label="Имя"
              path="name"
              size="large"
              required
            >
              <n-input
                v-model:value="formData.name"
                size="large"
                placeholder="Имя"
                clearable
              />
            </n-form-item>
            <n-form-item
              :validation-status="errors.patronymic && 'error'"
              :feedback="errors.patronymic || ''"
              :show-feedback="!!errors.patronymic"
              label="Отчество"
              path="patronymic"
              size="large"
            >
              <n-input
                v-model:value="formData.patronymic"
                size="large"
                placeholder="Отчество"
                clearable
              />
            </n-form-item>
            <n-form-item
              :validation-status="errors.relationship && 'error'"
              :feedback="errors.relationship || ''"
              :show-feedback="!!errors.relationship"
              label="Кем приходится"
              required
              path="relationship"
              size="large"
            >
              <n-input
                v-model:value="formData.relationship"
                size="large"
                placeholder="Кем приходится"
                clearable
              />
            </n-form-item>
            <div class="flex gap-x-4 gap-y-2">
              <n-form-item
                :validation-status="errors.birth_date && 'error'"
                :feedback="errors.birth_date || ''"
                :show-feedback="!!errors.birth_date"
                class="w-1/2"
                label="Годы жизни"
                path="birth_date"
                size="large"
              >
                <n-date-picker
                  v-model:value="formData.birth_date"
                  type="date"
                  format="dd.MM.yyyy"
                  placeholder="ДД.MM.ГГГГ"
                  size="large"
                  class="w-full"
                  clearable
                />
              </n-form-item>
              <n-form-item
                :validation-status="errors.death_date && 'error'"
                :feedback="errors.death_date || ''"
                :show-feedback="!!errors.death_date"
                class="w-1/2"
                label=""
                path="birth_date"
                size="large"
              >
                <n-date-picker
                  v-model:value="formData.death_date"
                  type="date"
                  format="dd.MM.yyyy"
                  placeholder="ДД.MM.ГГГГ"
                  size="large"
                  class="w-full"
                  clearable
                />
              </n-form-item>
            </div>
          </div>
      </n-card>
    <!-- Фото -->
      <n-card class="hover:shadow-lg transition-shadow duration-300 h-full">
        <div class="text-xl font-medium text-gray-800 mb-5">Фото</div>
        <n-form-item
          :validation-status="errors.image && 'error'"
          :feedback="errors.image || ''"
          :show-feedback="!!errors.image"
          label="Основное фото"
          path="image"
          size="large"
        >
          <n-upload
            ref="uploadPosterRef"
            :show-file-list="false"
            :multiple="false"
            :max="1"
            accept=".jpg,.jpeg,.png,.gif,.webp"
            class="person-image-upload h-full"
            action="/api/files/upload"
            directory-dnd
            clearable
            @before-upload="loading = true"
            @finish="uploadPosterFinishHandler"
            @remove="removePosterHandler"
            @error="($event) => {
              uploadImageErrorHandler($event)
              uploadPosterRef?.clear()
            }"
          >
            <n-upload-dragger
              class="relative py-10 h-full border-2 border-dashed border-gray-300
                hover:border-blue-500 transition-colors
                duration-300 text-[18px]"
            >
              <div class="flex justify-center mb-3">
                <img
                  v-if="formData.poster?.file_path"
                  :src="formData.poster.file_path"
                  class="w-80 h-80 object-contain bg-white"
                  alt="Person photo"
                >
                <img
                  v-else
                  src="/images/default-person.png"
                  class="w-60 h-80 object-contain bg-white opacity-40"
                  alt="No image"
                >
              </div>
              <n-text class="text-gray-600">Кликните или перетащите файл</n-text>
              <br>
              <n-p depth="3" class="text-gray-500 !my-2">
                Фото формата jpg, png, gif, webp весом не более 2мб.
              </n-p>
              <n-button
                v-if="formData.poster?.file_id"
                class="!absolute top-2 right-2"
                type="error"
                tertiary
                circle
                size="small"
                @click.stop="() => {
                  removePosterButtonClickHandler()
                  uploadPosterRef?.clear()
                }"
              >
                <n-icon size="18">
                  <remove-icon />
                </n-icon>
              </n-button>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
      </n-card>
            <!-- Подробная информация (на всю ширину) -->
      <div class="md:col-span-2">
        <n-card class="hover:shadow-lg transition-shadow duration-300">
          <div class="text-lg font-medium text-gray-700 mb-5">
            Подробная информация
          </div>
          <n-form-item
            :validation-status="errors.description && 'error'"
            :feedback="errors.description || ''"
            :show-feedback="!!errors.description"
            label="Биография"
            path="birth_date"
            size="large"
          >
            <n-input
              v-model:value="formData.description"
              :autosize="{ minRows: 10 }"
              type="textarea"
              size="large"
              placeholder="Расскажите подробнее о человеке..."
              class="mb-4"
              clearable
            />
          </n-form-item>
        </n-card>
      </div>
      <!-- Галерея -->
      <div class="md:col-span-2">
        <n-card class="hover:shadow-lg transition-shadow duration-300">
          <div class="text-lg font-medium text-gray-700 mb-5">
            Галерея
          </div>
          <n-upload
            ref="uploadGalleryRef"
            :file-list="galleryData"
            :max="30"
            accept=".jpg,.jpeg,.png,.gif,.webp"
            action="/api/files/upload"
            class="h-full"
            list-type="image-card"
            directory-dnd
            clearable
            multiple
            @before-upload="loading = true"
            @finish="uploadGalleryFinishHandler"
            @remove="removeGalleryItemHandler($event.index)"
            @update:file-list="updateFileListHandler"
            @error="($event) => {
              uploadImageErrorHandler($event)
              uploadGalleryRef?.clear()
            }"
          />
        </n-card>
      </div>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { Close as RemoveIcon } from '@vicons/ionicons5'
import { SEXES } from '../config'
import { usePersonForm } from '../model'

const {
  errors,
  loading,
  formData,
  galleryData,
  uploadPosterFinishHandler,
  uploadGalleryFinishHandler,
  updateFileListHandler,
  uploadImageErrorHandler,
  removePosterButtonClickHandler,
  removePosterHandler,
  removeGalleryItemHandler
} = usePersonForm()

const uploadPosterRef = ref()
const uploadGalleryRef = ref()
</script>
