<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  start: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="displayChangeBox rounded py-4 px-6"
  >
    <div class="font-medium">
      {{ title }}
    </div>
    <div class="text-2xl font-medium displayChangeBox__start">
      {{ start }} <span class="text-gray-500">→</span> <span class="displayChangeBox__target">{{ target }}</span>
    </div>
  </div>
</template>
