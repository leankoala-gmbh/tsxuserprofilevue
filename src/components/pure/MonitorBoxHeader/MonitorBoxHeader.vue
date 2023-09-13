<script lang="ts" setup>
const emit = defineEmits(['close'])
</script>

<template>
  <div class="monitorBoxHeader flex justify-between items-center py-4 px-6">
    <span class="font-medium text-base"><slot /></span>
    <GeneralButton
      variant="ghost"
      @click="emit('close')"
    >
      {{ t('close') }}
    </GeneralButton>
  </div>
</template>
