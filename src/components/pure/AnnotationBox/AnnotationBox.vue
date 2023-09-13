<script lang="ts" setup>
import type { LooseOnionString } from '@/types/general.interfaces'

type TMessageBoxTypes = 'success' | 'error' | 'info'

const props = defineProps({
  type: {
    type: String as () => LooseOnionString<TMessageBoxTypes>,
    default: 'success'
  }
})
</script>

<template>
  <div
    :class="`annotationBox--${type}`"
    class="annotationBox border rounded overflow-hidden p-4"
  >
    <slot />
  </div>
</template>
