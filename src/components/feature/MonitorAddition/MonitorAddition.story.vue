<script lang="ts" setup>
import MonitorAddition from './MonitorAddition.vue'

const open = ref(false)
const plan = ref({})
const type = ref('servers')
const size = ref({})
</script>

<docs lang="md">
  Lorem ipsum
</docs>

<template>
  <Story
    title="feature/MonitorAddition"
  >
    <MonitorAddition
      :open="open"
      :plan="plan"
      :type="type"
      :size="size"
    />
    <template #controls>
      <HstCheckbox
        v-model="open"
        title="Open"
      />
      <HstSelect
        v-model="type"
        title="Type"
        :options="[ 'servers', 'websites']"
      />
      <HstJson
        v-model="size"
        title="Size"
      />
    </template>
  </Story>
</template>

