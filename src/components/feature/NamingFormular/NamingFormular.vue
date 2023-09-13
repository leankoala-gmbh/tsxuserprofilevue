<script lang="ts" setup>
import { z } from 'zod'
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'
import { IProfileUser, IKeyValue, IApiError } from '@/types/general.interfaces'

const emit = defineEmits(['update'])

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const namingForm = reactive<IKeyValue>({
  firstName: '',
  familyName: ''
})

onMounted(() => {
  namingForm.firstName = props.userData?.firstName || ''
  namingForm.familyName = props.userData?.familyName || ''
})

const errorMsgFromApi = ref<IApiError>()

const submitName = async () => {
  errorMsgFromApi.value = undefined
  const payload = {
    firstName: namingForm.firstName,
    familyName: namingForm.familyName
  }
  try {
    await useApiAbstraction().setProfile(payload)
    emit('update', payload)
  } catch (e: any) {
    errorMsgFromApi.value = e.response.data
  }
}

</script>

<template>
  <form class="namingFormular" @submit.prevent="submitName">
    <div class="mb-6">
      <label class="mb-1 block text-sm">{{ t('firstName') }}</label>
      <FormInput
        v-model="namingForm.firstName"
        name="firstname"
        type="text"
      />
    </div>
    <div class="mb-6">
      <label class="mb-1 block">{{ t('lastName') }}</label>
      <FormInput
        v-model="namingForm.familyName"
        name="familyName"
        type="text"
      />
    </div>
    <ApiError class="mb-4" :error-obj="errorMsgFromApi" />
    <div class="mt-4">
      <GeneralButton
        variant="regular"
        type="submit"
      >
        {{ t('save') }}
      </GeneralButton>
    </div>
  </form>
</template>
