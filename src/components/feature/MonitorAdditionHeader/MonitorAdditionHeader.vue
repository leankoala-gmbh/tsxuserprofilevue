<script lang="ts" setup>
import { TMonitorTypes } from '@/types/general.interfaces'

const props = defineProps({
  isOpen: {
    type:Boolean,
    required: true
  },
  isAlert: {
    type:Boolean,
    required: true
  },
  title:{
    type:Object,
    default: () => ({})
  },
  type:{
    type: String as ()=> TMonitorTypes,
    default: 'servers'
  },
  quantity: {
    type:Number,
    required: true
  },
  totalPriceDisplay:{
    type: String,
    required: true
  },
  initialPriceDisplay:{
    type: String,
    required: true
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'ACT'
  },
  loading: {
    type: Boolean,
    default: false
  },
  priceError: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['header-event'])

const openBox = () => {
  if (props.readOnly || props.status === 'DEA' || props.priceError) return
  emit('header-event', true)
}
</script>

<template>
  <div class="monitoringAdditionHeader p-2">
    <div
      class="monitorAdditionHeader profileDetail--hover justify-center align-middle text-sm rounded px-4 py-1"
      :class="[
        readOnly || status === 'DEA' ? '' : 'cursor-pointer',
      ]"
    >
      <StatusMessage
        v-if="isAlert"
        class="mb-4"
      >
        {{ t('additionalSuccessMessage', {type: props.type}) }}
      </StatusMessage>
      <div
        class="flex justify-between items-center flex-wrap"
        @click="openBox"
      >
        <div class="flex w-full @[550px]/tsxupmain:w-auto gap-4 items-center justify-between font-bold flex-grow">
          {{ title[type] }}
        </div>
        <template v-if="!loading && !priceError">
          <div class="flex gap-8 justify-end">
            <div class="text-xs">
              {{ quantity }} <template v-if="status === 'ACT'">
                x {{ initialPriceDisplay }}
              </template>
            </div>
            <div v-if="status === 'ACT'" class="text-xs font-bold pr-3 min-w-[80px] text-right">
              {{ totalPriceDisplay }}/{{ t('mo') }}
            </div>
          </div>
          <div
            class="w-10 h-10 flex items-center justify-center"
          >
            <svg
              v-if="!readOnly && status === 'ACT'"
              class="w-4 h-4"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.25 12.875C1.00391 12.875 0.785156 12.793 0.621094 12.6289C0.265625 12.3008 0.265625 11.7266 0.621094 11.3984L5.24219 6.75L0.621094 2.12891C0.265625 1.80078 0.265625 1.22656 0.621094 0.898438C0.949219 0.542969 1.52344 0.542969 1.85156 0.898438L7.10156 6.14844C7.45703 6.47656 7.45703 7.05078 7.10156 7.37891L1.85156 12.6289C1.6875 12.793 1.46875 12.875 1.25 12.875Z" fill="#677489" />
            </svg>
          </div>
        </template>
        <template v-if="!priceError && loading">
          <Spinner />
        </template>
      </div>
      <AnnotationBox
        v-if="priceError"
        class="my-2"
        type="error"
      >
        {{ t('apiStatusError') }}
      </AnnotationBox>
    </div>
  </div>
</template>
