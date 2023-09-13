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
  }
})


</script>

<template>
  <div class="subscriptionStepCancel">
    <DisplayChangeBox
      class="mb-4"
      :title="t('changePlan')"
      :start="plan.type"
      target="X"
    />
    <p class="mb-4">
      {{ t('cancelSubscriptionText', {date: useLocalHelper().displayDate(plan.nextBillingDate)}) }}
    </p>
    <div class="flex gap-2 items-center">
      <GeneralButton
        variant="cancel"
        class="mb-8"
        @click="emit('trigger', 'cancelSubscription')"
      >
        {{ t('cancelSubscription') }}
      </GeneralButton>
      <GeneralButton
        variant="transparent"
        class="mb-8"
        @click="emit('trigger', 'info')"
      >
        {{ t('back') }}
      </GeneralButton>
    </div>
  </div>
</template>
