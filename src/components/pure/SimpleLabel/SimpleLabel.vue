<script lang="ts" setup>
import { TPlanStatus } from '@/types/general.interfaces'

const props = defineProps({
  type: {
    type: String as () => TPlanStatus,
    default: 'active' as TPlanStatus
  }
})
</script>

<template>
  <div
    class="simpleLabel px-2 py-[1px] text-sm rounded inline-block"
    :class="[`simpleLabel--${type}`]"
  >
    <slot />
  </div>
</template>
