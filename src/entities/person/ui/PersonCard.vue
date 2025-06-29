<template>
  <n-card
    class="hover:shadow-lg transition-shadow duration-300"
  >
    <template #cover>
      <div
        class="relative w-full h-50 overflow-hidden hover:opacity-80 cursor-pointer"
        @click="$emit('click:image')"
      >
        <div class="pointer-events-none absolute left-0 top-0 w-full h-12 bg-gradient-to-b from-gray-800 to-transparent"/>

        <img
          v-if="person.poster"
          :src="person.poster.file_path"
          :alt="person.name"
          class="w-full h-full object-cover"
        >
        <div
          v-else
          class="h-full w-full"
        >
          <img
            src="/images/default-person.png"
            :alt="person.name"
            class="w-full h-full object-contain opacity-40"
          >
        </div>

        <div class="text-lg text-white px-6 py-2 line-clamp-1 absolute left-0 top-0 z-10">
          #{{ person.relationship }}
        </div>

        <div
          class="text-lg text-white px-6 py-2 absolute left-0 bottom-0 z-10"
        >
          {{ person.birth_date }} - {{ person.death_date }}
        </div>

        <div class="pointer-events-none absolute left-0 bottom-0 w-full h-12 bg-gradient-to-t from-gray-800 to-transparent"/>
      </div>
    </template>
    <div class="flex flex-col space-y-1 h-full pt-3">
      <div class="flex justify-between items-start">
        <div class="overflow-hidden">
          <h3 class="text-xl font-medium text-gray-800 line-clamp-1">
            {{ !['', '-'].includes(person.surname) ? person.surname : '' }}
            {{ person.name }}
          </h3>
        </div>
        <div class="flex space-x-2">
          <n-button
            type="primary"
            quaternary
            circle
            @click="$emit('update', person.person_id, person)"
          >
            <template #icon>
              <n-icon><pencil-icon /></n-icon>
            </template>
          </n-button>
          <n-button
            quaternary
            circle
            type="error"
            @click="$emit('delete', person.person_id)"
          >
            <template #icon>
              <n-icon><trash-icon /></n-icon>
            </template>
          </n-button>
        </div>
      </div>

      <p
        v-if="person.description"
        class="text-gray-700 text-sm line-clamp-2"
      >
        {{ person.description }}
      </p>

       <nuxt-link
        :to="`/persons/${person.person_id}`"
        class="flex w-full mt-auto"
      >
        <n-button
          type="info"
          size="large"
          class="!w-full !mt-2"
          icon-placement="right"
          secondary
        >
          Подробнее
          <template #icon>
            <n-icon size="small">
              <more-icon />
            </n-icon>
          </template>
        </n-button>
       </nuxt-link>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import type { Person } from '@entities/person'
import {
  PencilOutline as PencilIcon,
  TrashOutline as TrashIcon,
  ArrowForward as MoreIcon
} from '@vicons/ionicons5'

defineProps<{ person: Person }>()

defineEmits<{
  (e: 'update', id: number, data: Person): void
  (e: 'delete', id: number): void,
  (e: 'click:image'): void
}>()
</script>
