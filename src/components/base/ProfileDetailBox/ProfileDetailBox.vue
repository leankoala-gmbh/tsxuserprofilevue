<script lang="ts" setup>
const props = defineProps({
  withHover: {
    type: Boolean,
    default: true
  },
  isOpen: {
    type: Boolean,
    default: true
  }
})
console.log('profileDetailBox')
</script>

<template>
  <div class="profileDetail rounded">
    <slot />
    <div
      v-if="$slots.body"
      class="gridTransition"
      :class="[
        isOpen ? 'gridTransition--open' : ''
      ]"
    >
      <div
        class="overflow-hidden"
        :class="[isOpen ? ' border-t border-gray-200' : '']"
      >
        <div class="p-6">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

