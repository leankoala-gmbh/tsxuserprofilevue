<script lang="ts" setup>
import { IApiError } from '@/types/general.interfaces'
import { validateEmail } from '@/utils/formValidators'

const emit = defineEmits(['close'])

const password = ref('')
const error = ref('')

const canBeRemoved = ref(true)

const checkInput = () => {
  const isEmpty = password.value.length === 0
  const isEmail = validateEmail(password.value)
  error.value = isEmpty ? t('emptyError') : ''
  canBeRemoved.value = !isEmpty && isEmail
}

const errorMsgFromApi = ref<IApiError>()

const handleRemove = async () => {
  errorMsgFromApi.value = undefined
  try {
    await useApiAbstraction().removeAccount(password.value)
    window.mitt.emit('tsxUserProfile', {
      action: 'removeAccount'
    })
  } catch (e: any) {
    errorMsgFromApi.value = e.response.data
  }
}
</script>

<template>
  <div class="removeAccountFormular">
    <div class="my-6">
      <div class="mt-6 mb-2">
        {{ t('enterEmailConfirmRemove') }}
      </div>
      <FormInput
        v-model="password"
        name="passwordConfirm"
        type="password"
        :error-string="error"
        @input="checkInput"
      />
    </div>
    <ApiError class="mb-4" :error-obj="errorMsgFromApi" />
    <GeneralButton
      :is-disabled="canBeRemoved"
      @click="handleRemove"
    >
      {{ t('removeAccountButton') }}
    </GeneralButton>
  </div>
</template>
