<template>
  <div class="persons-view-page w-full my-4">
    <person-list />
  </div>
</template>

<script lang="ts" setup>
import { PersonList } from '@widgets/person'

useHead({
  title: 'Биографии'
})
</script>
