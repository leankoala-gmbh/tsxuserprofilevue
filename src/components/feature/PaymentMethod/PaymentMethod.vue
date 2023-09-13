<script lang="ts" setup>
import { ILicensesDetails } from '@/types/general.interfaces'

const props = defineProps({
  planDetails: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  }
})
</script>

<template>
  <a
    target="_blank"
    class="profileDetail profileDetail--darker paymentMethod rounded px-4 py-2 flex gap-4 justify-between items-center cursor-pointer"
    :href="planDetails.changePaymentSubscriptionUrl"
  >
    <div class="flex gap-2 items-center">
      <div>{{ t('changePaymentDetails') }}</div>
    </div>
    <div>
      <div
        class="w-10 h-10 flex items-center justify-center text-gray-500"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.25 12.875C1.00391 12.875 0.785156 12.793 0.621094 12.6289C0.265625 12.3008 0.265625 11.7266 0.621094 11.3984L5.24219 6.75L0.621094 2.12891C0.265625 1.80078 0.265625 1.22656 0.621094 0.898438C0.949219 0.542969 1.52344 0.542969 1.85156 0.898438L7.10156 6.14844C7.45703 6.47656 7.45703 7.05078 7.10156 7.37891L1.85156 12.6289C1.6875 12.793 1.46875 12.875 1.25 12.875Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  </a>
</template>
