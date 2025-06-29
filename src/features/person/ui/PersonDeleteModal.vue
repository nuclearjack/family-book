<template>
  <n-modal
    v-model:show="show"
    class="max-w-[480px]"
    @update:show="val => emit('update:modelValue', val)"
  >
    <n-card title="Подтверждение удаления">
      Вы точно хотите удалить эту биографию?
      <template #footer>
        <div class="flex gap-2">
          <n-button
            type="error"
            size="large"
            secondary
            class="flex-grow"
            @click="emitConfirm"
          >
            Да
          </n-button>
          <n-button
            size="large"
            secondary
            class="flex-grow"
            @click="emitCancel"
          >
            Нет
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const show = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    show.value = val
  },
  { immediate: true }
)

const emitConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}

const emitCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>
