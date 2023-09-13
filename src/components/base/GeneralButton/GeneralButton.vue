<script lang="ts" setup>
type TButtonTags = 'a' | 'button' | 'div'
type TVariant = 'regular' | 'ghost' | 'transparent' | 'cancel'

const emit = defineEmits(['click'])

const props = defineProps({
  tag: {
    type: String as () => TButtonTags,
    default: 'button'
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String as () => TVariant,
    default: 'regular'
  }
})

const sendClick = () => {
  if (props.isDisabled) return
  emit('click')
}
</script>

<template>
  <component
    :is="tag"
    :disabled="isDisabled"
    class="rounded h-10 flex items-center justify-center px-4 duration-300 transition border-current border font-medium"
    :class="[
      { 'isDisabled': isDisabled },
      { 'hover:underline': variant === 'transparent'},
      `generalButton--${variant}`
    ]"
    @click.stop="sendClick"
  >
    <slot />
  </component>
</template>

