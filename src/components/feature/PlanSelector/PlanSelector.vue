<script lang="ts" setup>
import { IPlanSelector, IPlansUpsells } from '@/types/general.interfaces'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const emit = defineEmits(['updatePlan'])

const props = defineProps({
  plans: {
    type: Array as () => any[],
    default: () => []
  },
  current: {
    type: String,
    default: 'pro'
  }
})

debugEcho('props.plans', props.plans)

const selected = ref<IPlanSelector>()

const disabledPlan = (id: string) => {
  const disabled = new Set([...props.plans, props.current])
  return [...disabled].includes(id)
}

const planDetails = (currentPlan: any) => {
  const plan = props.plans.find((plan) => plan.name === currentPlan.name)
  if (!plan) return ''
  return useLocalHelper().displayPrice(plan?.price.gross, plan?.price.currency)
}

watch(() => selected.value, (val) => {
  emit('updatePlan', selected.value)
})
</script>

<template>
  <div class="planSelector">
    <RadioGroup v-model="selected">
      <div class="planSelector__base relative -space-y-px rounded-md overflow-hidden">
        <RadioGroupOption
          v-for="(plan, planIdx) in plans"
          :key="planIdx"
          v-slot="{ checked, active, disabled }"
          as="template"
          :value="plan"
          :disabled="disabledPlan(plan.id)"
        >
          <div
            :class="[
              planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
              planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
              checked ? 'planSelector__option--checked z-10' : 'planselector__option--unchecked',
              'relative border py-4 cursor-pointer px-5 grid grid-cols-2 focus:outline-none flex-shrink-0'
            ]"
          >
            <span class="flex items-center text-sm">
              <span
                :class="[
                  disabled ? 'border-gray-400 bg-gray-300' : checked ? 'planSelector__bullet--checked border-transparent' : 'planSelector__bullet--unchecked',

                  'h-4 w-4 rounded-full border flex items-center justify-center  flex-shrink-0'
                ]"
                aria-hidden="true"
              >
                <span
                  class="rounded-full w-1.5 h-1.5"
                  :class="[disabled ? 'bg-gray-300' : 'bg-white']"
                />
              </span>
              <RadioGroupLabel
                as="span"
                :class="[
                  disabled ? 'planSelector__text--disabled' : checked ? 'planSelector__text--checked' : 'planSelector__text--unchecked',
                  'ml-3 font-medium'
                ]"
              >
                {{ t(`planName${plan.id}`) }}
              </RadioGroupLabel>
            </span>
            <RadioGroupDescription
              as="span"
              class="ml-6 pl-1  md:ml-0 md:pl-0 text-right font-normal text-sm"
            >
              <span
                class="font-normal"
                :class="[
                  disabled ? 'planSelector__text--disabled' : checked ? 'planSelector__text--checked' : 'planSelector__text--unchecked',
                  'ml-3 font-medium'
                ]"
              >
                {{ plan.name === current ? t('yourCurrentPlan') : planDetails(plan) }}
              </span>
              {{ ' ' }}
            </RadioGroupDescription>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>
