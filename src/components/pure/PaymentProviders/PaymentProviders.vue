<script lang="ts" setup>
import { TPaymentProviders } from '@/types/general.interfaces'
// TODO: fill with svg icons
const props = defineProps({
  provider: {
    type: String as () => TPaymentProviders,
    default: ''
  }
})
</script>

<template>
  <div class="paymentProviders">
    {{ provider }}
  </div>
</template>
