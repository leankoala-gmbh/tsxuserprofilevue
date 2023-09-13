subscriptionStepChange

<script lang="ts" setup>
import { ILicensesDetails, IPlanSelector, IPlanUpsellsFull } from '@/types/general.interfaces'
import { pricingPageLink } from '@/data/constants'

const emit = defineEmits(['trigger', 'selectedPlan'])

const props = defineProps({
  status: {
    type: String,
    default: 'active'
  },
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  },
  subscriptionPlans: {
    type: Array as () => IPlanUpsellsFull[],
    default: () => ([])
  },
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  }
})

const selectedPlan = ref<null|IPlanSelector>(null)
const statusHeadline = ref<string>('')
const statusText = ref<string>('')

const generateStatusText = () => {
  if (!selectedPlan.value) return

  const price = useLocalHelper().displayPrice(selectedPlan.value.price.gross, selectedPlan.value.price.currency)
  const vat = useLocalHelper().displayPrice(selectedPlan.value.price.vat, selectedPlan.value.price.currency)

  statusHeadline.value = t('chargedHeadline', {
    price,
    ie: t('incl'),
    vat
  })
  statusText.value = t('chargedText', {
    price,
    date: useLocalHelper().displayDate(String(new Date())),
    ie: t('incl'),
    interval: t('mo'),
    vat
  })
}

watchEffect(() => {
  emit('selectedPlan', selectedPlan.value)
  generateStatusText()
})

const subscription = computed(() => {
  return props.subscriptionPlans.find((val) => val.productName === props.plan.type)?.upsells
})


</script>

<template>
  <div class="subscriptionStepChange">
    <div class="flex gap-2 items-center mb-4">
      <h3
        class="font-medium text-xl"
        :class="[ status === 'active' ? 'text-active' : '' ]"
        data-testId="planType"
      >
        {{ plan.type }}
      </h3>
    </div>

    <template v-if="subscription?.length">
      <p class="font-medium mb-2">
        {{ t('chooseNewPlan') }}
      </p>
      <PlanSelector
        class="mb-4"
        :plans="subscription"
        current="pro"
        @update-plan="selectedPlan = $event"
      />
      <a
        v-if="!inactiveFields.includes('comparePlansLink')"
        class="flex mb-2"
        target="_blank"
        :href="pricingPageLink"
      >
        {{ t('comparePlans') }}
        <svg
          class="w-3 ml-2"
          viewBox="0 0 14 13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.875 1.5C7.875 1.03516 8.25781 0.625 8.75 0.625H12.2227C12.3594 0.625 12.4688 0.652344 12.5781 0.707031C12.6602 0.734375 12.7695 0.816406 12.8516 0.898438C13.0156 1.0625 13.0977 1.28125 13.125 1.5V5C13.125 5.49219 12.7148 5.875 12.25 5.875C11.7578 5.875 11.375 5.49219 11.375 5V3.63281L6.72656 8.25391C6.39844 8.60938 5.82422 8.60938 5.49609 8.25391C5.14062 7.92578 5.14062 7.35156 5.49609 7.02344L10.1172 2.375H8.75C8.25781 2.375 7.875 1.99219 7.875 1.5ZM0.875 3.25C0.875 2.29297 1.64062 1.5 2.625 1.5H5.25C5.71484 1.5 6.125 1.91016 6.125 2.375C6.125 2.86719 5.71484 3.25 5.25 3.25H2.625V11.125H10.5V8.5C10.5 8.03516 10.8828 7.625 11.375 7.625C11.8398 7.625 12.25 8.03516 12.25 8.5V11.125C12.25 12.1094 11.457 12.875 10.5 12.875H2.625C1.64062 12.875 0.875 12.1094 0.875 11.125V3.25Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <template v-if="selectedPlan">
        <AnnotationBox type="info" class="mb-4">
          <div class="flex">
            <div class="self-center mx-2 text-center text-current">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <div class="text-justify px-4">
              <div class="font-bold mb-2">
                {{ statusHeadline }}
              </div>
              {{ statusText }}
            </div>
          </div>
        </AnnotationBox>
        <div class="flex gap-4 items-center">
          <GeneralButton
            class="mb-8"
            @click="emit('trigger', 'confirm')"
          >
            {{ t('confirmSubscription') }}
          </GeneralButton>
          <GeneralButton
            variant="transparent"
            class="mb-8"
            @click="emit('trigger', 'info')"
          >
            {{ t('back') }}
          </GeneralButton>
        </div>
        <p class="font-medium mb-2'">
          {{ t('payment') }}
        </p>
        <p class="mb-4">
          {{ t('paymentInfo') }}
        </p>
        <PaymentMethod
          class="mb-8"
          :plan-details="plan"
        />
        <CleverBridgeInfo />
      </template>
    </template>
    <template v-else>
      <p>{{ t('noUpsellAvailable') }}</p>
    </template>
  </div>
</template>
