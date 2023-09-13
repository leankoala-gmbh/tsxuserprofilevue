<script lang="ts" setup>
import { ISubscriptionHeaderDetails } from '@/types/general.interfaces'

const emit = defineEmits(['headerEvent'])

const props = defineProps({
  closedHeader: {
    type: Boolean,
    required: true
  },
  subscriptionDetail: {
    type: Object as () => ISubscriptionHeaderDetails,
    required: true
  },
  headerOverride: {
    type: String,
    default: ''
  },
  overrideHeaderStep: {
    type: String,
    default: ''
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  inactiveLicense: {
    type: Boolean,
    default: false
  }
})

const headerDict: {[key: string]: string} = {
  default: `${props.subscriptionDetail.planName } ${ t('subscriptionDetails') }`,
  confirm: t('confirmPlanChange'),
  cancel: t('cancelSubscription')
}

const headline = ref(headerDict.default)

watchEffect(() => {
  headline.value = headerDict[props.overrideHeaderStep] || headerDict.default
})

const openBox = () => {
  if (props.readOnly || props.inactiveLicense) return
  emit('headerEvent', true)
}
</script>

<template>
  <div
    v-if="Object.keys(subscriptionDetail).length"
    class="subscriptionHeader p-2"
  >
    <div
      v-if="closedHeader"
      class="profileDetail--hover  flex justify-between items-center rounded px-4 py-5"
      :class="[
        readOnly || inactiveLicense ? '' : 'cursor-pointer'
      ]"
      @click="openBox"
    >
      <div class="w-full">
        <div class="flex gap-2 items-center mb-2">
          <h3
            class="font-medium text-base"
            :class="[ subscriptionDetail.status === 'active' ? 'text-active' : '' ]"
          >
            {{ subscriptionDetail.planName }}
          </h3>
          <SimpleLabel :type="subscriptionDetail.status">
            {{ t(subscriptionDetail.status) }}
          </SimpleLabel>
        </div>
        <div v-if="subscriptionDetail.licenseId" class="mb-2">
          <span class="mr-1 text-gray-500">
            {{ t('licenseId') }}:
          </span>
          <span>
            {{ subscriptionDetail.licenseId }}
          </span>
        </div>
        <BillingLine
          class="pr-4"
          :date="subscriptionDetail.date"
          :status="subscriptionDetail.status"
          :price="subscriptionDetail.price"
          :currency="subscriptionDetail.currency"
          :inactive="inactiveLicense"
        />
      </div>
      <div class="w-10 h-10 flex items-center justify-center text-gray-500">
        <svg
          v-if="!readOnly && !inactiveLicense"
          class="w-4 h-4"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.25 12.875C1.00391 12.875 0.785156 12.793 0.621094 12.6289C0.265625 12.3008 0.265625 11.7266 0.621094 11.3984L5.24219 6.75L0.621094 2.12891C0.265625 1.80078 0.265625 1.22656 0.621094 0.898438C0.949219 0.542969 1.52344 0.542969 1.85156 0.898438L7.10156 6.14844C7.45703 6.47656 7.45703 7.05078 7.10156 7.37891L1.85156 12.6289C1.6875 12.793 1.46875 12.875 1.25 12.875Z" fill="currentColor" />
        </svg>
      </div>
    </div>
    <div
      v-else
      class="flex items-center justify-between px-4 py-4"
    >
      <h3 class="font-medium text-base">
        {{ headerDict[overrideHeaderStep] || headerDict.default }}
      </h3>

      <GeneralButton
        variant="ghost"
        @click="emit('headerEvent', false)"
      >
        {{ t('close') }}
      </GeneralButton>
    </div>
  </div>
</template>
