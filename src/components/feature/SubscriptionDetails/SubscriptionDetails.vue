<script lang="ts" setup>
import { ILicensesDetails } from '@/types/general.interfaces'

const props = defineProps({
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  }
})

const details = computed(() => {
  return [
    {
      title: 'Billing Details',
      items: [
        {
          label: 'Subscription ID',
          value: props.plan.keyId
        }
      ]
    },
    {
      title: 'License Details',
      items: [
        {
          label: 'License ID',
          value: props.plan.keyNumber
        },
        {
          label: 'Creation Date',
          value: props.plan.createDate
        },
        {
          label: 'Activation Code',
          value: props.plan.activationCode
        }
      ]
    }
  ]
})
</script>

<template>
  <div class="flex gap-4 flex-col">
    <div v-for="(group, gi) in details" :key="gi">
      <p class="font-medium mb-2">
        {{ group.title }}
      </p>
      <div class="flex gap-2 flex-col">
        <div
          v-for="(item, i) in group.items"
          :key="i"
          class="grid gap-2 grid-cols-7"
        >
          <div class="col-span-2 text-gray-500">
            {{ item.label }}
          </div>
          <div class="col-span-5 font-medium">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
