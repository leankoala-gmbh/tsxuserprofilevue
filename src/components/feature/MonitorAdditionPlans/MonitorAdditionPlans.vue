<script lang="ts" setup>
import { ILicenseCache, ILicensesDetails, TMonitorTypes } from '@/types/general.interfaces'

const emit = defineEmits(['update'])

const props = defineProps({
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  basePrices: {
    type: Object,
    default: () => ({})
  },
  licenseCache: {
    type: Object as () => ILicenseCache,
    default: () => ({})
  },
  canUserBuy: {
    type: Boolean,
    required: true
  },
  priceError: {
    type: String,
    required: true
  }
})

const types = ['servers', 'websites']

</script>

<template>
  <div class="monitorAdditionPlans">
    <MonitorAddition
      v-for="(type, i) in types"
      :key="i"
      :plan="plan"
      :type="type as TMonitorTypes"
      class="mb-1"
      :read-only="readOnly"
      :can-user-buy="canUserBuy"
      :base-prices="basePrices"
      :price-error="priceError"
      :license-cache="licenseCache"
      @update="(e) => emit('update', e)"
    />
  </div>
</template>
