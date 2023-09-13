<script lang="ts" setup>
const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 10
  },
  quantityValue: {
    type: Number,
    default: 1
  },
  canUserBuy: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['changeQuantity'])

const quantity = ref(0)

watch(() => props.quantityValue, () => {
  quantity.value = props.quantityValue
}, { immediate: true })


const errorString = t('monitorRange', {
  min: props.min.toString(),
  max: props.max.toString()
})


const isWithinRange = computed(() => {
  return quantity.value >= props.min && quantity.value <= props.max
})

const isLowerLimit = computed(() => {
  return quantity.value === props.min
})
const isUpperLimit = computed(() => {
  return quantity.value === props.max
})

const operations = (operation: string) => {
  if (operation === 'minus'){
    if (isLowerLimit.value) return
    quantity.value--
  }
  else if (operation === 'plus'){
    if (isUpperLimit.value) return
    quantity.value++
  } else {
    return
  }
}

const handleQuantity = (operation: string) => {
  operations(operation)

  emit('changeQuantity', quantity.value)
}

watch(() => quantity.value, () => {
  quantity.value = isNaN(quantity.value ) ? 0 : quantity.value
  quantity.value = quantity.value < 0 ? 0 : quantity.value

  quantity.value = quantity.value < props.min ? props.min : quantity.value
  quantity.value = quantity.value > props.max ? props.max : quantity.value
  if (isWithinRange || !isLowerLimit || !isUpperLimit) return
}, { immediate: true })
</script>

<template>
  <div class="quantitySelector flex flex-wrap justify-center">
    <button
      aria-label="handleMinusQuantity"
      class="rounded-l-md border w-8 h-8 disabled:bg-gray-200"
      :disabled="!isWithinRange || isLowerLimit || !canUserBuy"
      @click="handleQuantity('minus')"
    >
      -
    </button>
    <input
      v-model="quantity"
      :disabled="!canUserBuy"
      aria-label="handleInputQuantity"
      class="border-y text-center w-10 h-8"
      @input="handleQuantity('')"
    >
    <button
      aria-label="handlePlusQuantity"
      class="rounded-r-md border w-8 h-8 disabled:bg-gray-200"
      :disabled="!isWithinRange || isUpperLimit || !canUserBuy"
      @click="handleQuantity('plus')"
    >
      +
    </button>
    <ErrorMessage v-if="!isWithinRange">
      {{ errorString }}
    </ErrorMessage>
  </div>
</template>
