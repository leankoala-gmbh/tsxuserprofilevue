<script lang="ts" setup>
const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  steps: {
    type: Number,
    default: 10
  }
})

const progress = ref(0)
let intervalId : Timer

const startProgressBar = () => {
  intervalId = setInterval(() => {
    if (progress.value < 100 ) {
      progress.value += 100 / props.steps
    } else {
      clearInterval(intervalId)
    }
  }, props.time * 1000 / props.steps)
}

onMounted(startProgressBar)
onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <div class="progressBar rounded-full overflow-hidden bg-white border border-gray-200 h-2 relative">
    <div
      class="progressBar__inner h-2 rounded-full bg-gray-400 duration-500 transition-all ease-in-out"
      :style="[
        { width: `${progress}%` }
      ]"
    />
  </div>
</template>
