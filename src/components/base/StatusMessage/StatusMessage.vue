<script lang="ts" setup>
type TStatusMessageTypes = 'success' | 'error'

const props = defineProps({
  timeout: {
    type: Number,
    default: 0
  },
  type: {
    type: String as () => TStatusMessageTypes,
    default: 'success'
  }
})

const showMessageBox = ref(false)

watch(() => props.timeout, () => {
  if (props.timeout === 0) {
    showMessageBox.value = true
    return
  }
  if (props.timeout > 0) {
    showMessageBox.value = true
    setTimeout(() => {
      showMessageBox.value = false
    }, props.timeout)
  }
}, { immediate: true })

</script>

<template>
  <AnnotationBox
    v-if="showMessageBox"
    class="statusMessage"
    :type="type"
  >
    <slot />
  </AnnotationBox>
</template>
