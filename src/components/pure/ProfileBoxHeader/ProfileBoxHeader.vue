<script lang="ts" setup>
const emit = defineEmits(['close'])
console.log('profileBoxHeader')
</script>

<template>
  <div class="profileBoxHeader flex justify-between items-center p-6">
    <span class="font-medium text-base"><slot /></span>
    <GeneralButton
      variant="ghost"
      @click="emit('close')"
    >
      {{ t('close') }}
    </GeneralButton>
  </div>
</template>
