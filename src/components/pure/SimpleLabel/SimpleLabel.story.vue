<script lang="ts" setup>
import SimpleLabel from './SimpleLabel.vue'

const testString = 'helloWorld'

const types = ['active', 'canceled']
const selectedType = ref(types[0])
</script>

<docs lang="md">
  Creates a simple label to indicate the status of the license.
</docs>

<template>
  <Story
    title="pure/SimpleLabel"
  >
    <SimpleLabel :type="selectedType">
      {{ testString }}
    </SimpleLabel>
    <template #controls="{ state}">
      <HstSelect
        v-model="selectedType"
        title="Types"
        :options="types"
      />
    </template>
  </Story>
</template>

