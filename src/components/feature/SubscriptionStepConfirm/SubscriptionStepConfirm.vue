<script lang="ts" setup>
import { ILicensesDetails } from '@/types/general.interfaces'

const emit = defineEmits(['trigger'])

const props = defineProps({
  status: {
    type: String,
    default: 'active'
  },
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  },
  selectedPlan: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="subscriptionStepConfirm">
    <DisplayChangeBox
      class="mb-4"
      :title="t('changePlan')"
      :start="plan.type"
      :target="selectedPlan"
    />
    <p class="mb-4" v-html="t('confirmNote')" />
    <div class="flex gap-2 items-center">
      <GeneralButton
        class="mb-8"
        @click="emit('trigger', 'buynow')"
      >
        {{ t('buyNow') }}
      </GeneralButton>
      <GeneralButton
        variant="transparent"
        class="mb-8"
        @click="emit('trigger', 'change')"
      >
        {{ t('back') }}
      </GeneralButton>
    </div>
  </div>
</template>
