<script lang="ts" setup>
import { ILicensesServers, TMonitorTypes, IMonitorStatusTitle, ILicensesDetails, ILicenseCache } from '@/types/general.interfaces'
import { useLocalHelper } from '@/composables/localHelper/localHelper'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  subTitle: {
    type: Object as () => IMonitorStatusTitle,
    default: ()=> ({})
  },
  type:{
    type: String as () => TMonitorTypes,
    default: 'servers'
  },
  size:{
    type: Object as () => ILicensesServers,
    default: ()=>({})
  },
  planDetails:{
    type: Object as () => ILicensesDetails,
    default: ()=>({})
  },
  licenseCache: {
    type: Object as () => ILicenseCache,
    default: () => ({})
  },
  status: {
    type: String,
    required: true
  },
  link:{
    type: String,
    required:true
  },
  priceDisplay: {
    type: String,
    required: true
  },
  totalDisplay: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  statusHeadline : {
    type: String,
    required: true
  },
  statusText : {
    type: String,
    required: true
  },
  currentCount: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  canUserBuy: {
    type: Boolean,
    default: false
  },
  apiError: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handleChange', 'handleStatus'])

const newQuantity = ref(props.size.next_cycle_count)

const debounced = ref(false)
const debouncedMessage = useDebounceFn(async() => {
  debounced.value = true
}, 750)


const onChangeQuantity = async (e: number) => {
  debounced.value = false
  newQuantity.value = e
  emit('handleChange', e)
  await debouncedMessage()
}

const isSameQuantity = computed(() => {
  return props.size.next_cycle_count === newQuantity.value

})

const licenseCacheEntry = computed(() => props.licenseCache[props.planDetails.keyId])

const additionDifference = computed(() => licenseCacheEntry.value[`${props.type}Diff`])

const { displayDate } = useLocalHelper()
const additionalDiffenceInfo = computed(() => {
  return t(props.type === 'servers' ? 'changedServersUseCount' : 'changeWebsitesUseCount', {
    date: displayDate(props.planDetails.nextBillingDate),
    nextCount: licenseCacheEntry.value[`${props.type}NextCycle`].toString(),
    count: licenseCacheEntry.value[props.type].toString()
  })
})
</script>

<template>
  <div v-if="status === 'info'" class="monitorAdditionInfo">
    <AnnotationBox
      v-if="additionDifference > 0"
      class="my-4"
    >
      {{ additionalDiffenceInfo }}
    </AnnotationBox>

    <div class="tsxUp-grid-monitorQuantity">
      <div class="font-bold tsxUp-grid-monitorQuantity__1">
        {{ subTitle[type][status] }}
      </div>

      <QuantitySelector
        class="tsxUp-grid-monitorQuantity__2"
        :min="size.min"
        :max="size.max - currentCount"
        :quantity-value="currentCount"
        :can-user-buy="canUserBuy"
        @change-quantity="onChangeQuantity"
      />
      <div class="font-light text-xs tsxUp-grid-monitorQuantity__3">
        x&nbsp;{{ priceDisplay }}
      </div>
      <div class="text-sm tsxUp-grid-monitorQuantity__4">
        {{ totalDisplay }}/{{ t('mo') }}
      </div>
    </div>
    <Transition name="fade">
      <div v-if="apiError" class="my-4">
        <ApiStatus type="error">
          {{ apiError }}
        </ApiStatus>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="!canUserBuy && !apiError" class="my-4">
        <AnnotationBox type="error">
          {{ t('timeOutBuy') }}
        </AnnotationBox>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="canUserBuy && !isSameQuantity && debounced && !apiError">
        <AnnotationBox
          type="info"
          class="my-4"
        >
          <div class="flex">
            <div class="self-center mx-2 text-center text-current">
              <Spinner v-if="loading" />
              <svg
                v-else
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
        <p class="font-medium mb-2'">
          {{ t('payment') }}
        </p>
        <p class="mb-4">
          {{ t('paymentInfo') }}
        </p>
        <PaymentMethod
          :plan-details="props.planDetails"
          class="mb-8 mt-2"
        />
        <GeneralButton
          class="mb-6"
          :is-disabled="loading || !canUserBuy"
          @click="emit('handleStatus','confirm')"
        >
          {{ t('confirmSubscription') }}
        </GeneralButton>
        <CleverBridgeInfo />
      </div>
    </Transition>
  </div>
</template>
