<script lang="ts" setup>
import { ILicensesDetails, TPlanStatus, IPlanUpsellsFull, ISubscriptionHeaderDetails } from '@/types/general.interfaces'

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
  subscriptionDetail: {
    type: Object as () => ISubscriptionHeaderDetails,
    required: true
  },
  subscriptionPlans: {
    type: Object as () => IPlanUpsellsFull[],
    default: () => ({})
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  licenseId: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="subscriptionStepInfo">
    <div class="flex gap-2 items-center mb-2">
      <h3
        class="font-medium text-xl"
        :class="[ status === 'active' ? 'text-active' : '' ]"
      >
        {{ plan.type }}
      </h3>
      <SimpleLabel :type="status as TPlanStatus">
        {{ t(status) }}
      </SimpleLabel>
    </div>
    <div v-if="subscriptionDetail.licenseId?.length" class="mb-2">
      <span class="mr-1 text-gray-500">
        {{ t('licenseId') }}:
      </span>
      <span>
        {{ subscriptionDetail.licenseId }}
      </span>
    </div>
    <BillingLine
      class="mb-4"
      :date="plan.nextBillingDate"
      :status="plan.status"
      :price="plan.renewalCostGross"
      :currency="plan.renewalCurrency"
    />
    <div v-if="props.status === 'active' && !readOnly">
      <div
        class="flex gap-2 items-center mb-6"
        aria-label="changePlanDetails"
      >
        <GeneralButton
          v-if="subscriptionPlans.length"
          @click="emit('trigger', 'change')"
        >
          {{ t('changePlan') }}
        </GeneralButton>
        <GeneralButton
          variant="transparent"
          @click="emit('trigger', 'cancel')"
        >
          {{ t('cancelSubscription') }}
        </GeneralButton>
      </div>
      <PaymentMethod
        class="mb-8"
        :plan-details="plan"
      />
    </div>
  </div>
</template>
