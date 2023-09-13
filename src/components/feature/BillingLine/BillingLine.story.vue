<script lang="ts" setup>
import BillingLine from './BillingLine.vue'

const status = ref('active')
const price = ref(1000)
const currency = ref('EUR')
const interval = ref('mo')
</script>

<docs lang="md">
  Lorem ipsum
</docs>

<template>
  <Story
    title="feature/BillingLine"
  >
    <BillingLine
      :date="new Date().toISOString()"
      :status="status"
      :price="price"
      :currency="currency"
      :interval="interval"
    />
    <template #controls>
      <HstSelect
        v-model="status"
        title="Status"
        :options="[ 'active', 'canceled']"
      />
      <HstNumber
        v-model="price"
        title="Price"
      />
      <HstText
        v-model="currency"
        title="Currency"
      />
      <HstText
        v-model="interval"
        title="Interval"
      />
    </template>
  </Story>
</template>

