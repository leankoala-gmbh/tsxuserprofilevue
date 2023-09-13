<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)

watch(() => props.open, () => {
  if (props.open) isOpen.value = true
}, { immediate: true })
</script>

<template>
  <ProfileDetailBox
    :is-open="isOpen"
    class="profileRemove"
  >
    <div v-if="!isOpen" class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer">
      <div class="flex justify-between" @click="isOpen = true">
        <div>
          <div class="text-base font-medium mb-2">
            {{ t('removeAccount') }}
          </div>
          <div class="text-sm text-gray-600" v-html="t('removeAccountBody')" />
        </div>

        <div
          class="w-10 h-10 flex items-center justify-center"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.25 12.875C1.00391 12.875 0.785156 12.793 0.621094 12.6289C0.265625 12.3008 0.265625 11.7266 0.621094 11.3984L5.24219 6.75L0.621094 2.12891C0.265625 1.80078 0.265625 1.22656 0.621094 0.898438C0.949219 0.542969 1.52344 0.542969 1.85156 0.898438L7.10156 6.14844C7.45703 6.47656 7.45703 7.05078 7.10156 7.37891L1.85156 12.6289C1.6875 12.793 1.46875 12.875 1.25 12.875Z" fill="#677489" />
          </svg>
        </div>
      </div>
    </div>
    <ProfileBoxHeader
      v-else
      class="my-1"
      @close="isOpen = false"
    >
      {{ t('removeAccount') }}
    </ProfileBoxHeader>
    <template #body>
      <AnnotationBox type="error">
        <div class="flex">
          <div class="self-center mx-2 text-center text-current">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            ><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
          </div>
          <div class="text-justify px-4">
            <div class="font-bold mb-2">
              {{ t('removeAccountAnnotationTitle') }}
            </div>
            {{ t('removeAccountAnnotationContent') }}
          </div>
        </div>
      </AnnotationBox>
      <RemoveAccountFormular />
    </template>
  </ProfileDetailBox>
</template>

