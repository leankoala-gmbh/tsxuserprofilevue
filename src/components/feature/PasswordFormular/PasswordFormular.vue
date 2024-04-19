<script lang="ts" setup>
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'
import { IApiError, IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const passwordForm = reactive<{[key: string]: string}>({
  currentPassword: '',
  newPassword: ''
})

const error = reactive<{current: string, new: string}>({
  current: '',
  new: ''
})

const canBeSaved = reactive<{current:boolean, new:boolean}>({
  current: false,
  new: false
})

const checkCurrentPassword = () => {
  const isValid = !!passwordForm.currentPassword.trim().length
  error.current = isValid
    ? ''
    : t('passwordTooShort')
  canBeSaved.current = isValid
}

const successForm = ref(false)
const errorMsgFromApi = ref<IApiError>()

const submitPassword = async () => {
  if (!props.userData.isOauthUser && !canBeSaved.current ) return

  errorMsgFromApi.value = undefined
  try {
    await useApiAbstraction()
      .changePassword(passwordForm.currentPassword, passwordForm.newPassword)
    successForm.value = true
    setTimeout(() => {
      successForm.value = false
    }, 3000)
    window.mitt.emit('tsxUserProfile', {
      action: 'changePassword'
    })
  } catch (e: any) {
    errorMsgFromApi.value = e.response.data
  }
}
</script>

<template>
  <div class="passwordFormular">
    <StatusMessage v-if="successForm" class="mb-4">
      {{ t('successChangePassword') }}
    </StatusMessage>
    <form @submit.prevent="submitPassword">
      <div v-if="!userData.isOauthUser" class="mb-6">
        <label class="capitalize">{{ t('currentPassword') }}</label>
        <FormInput
          id="currentPassword"
          v-model="passwordForm.currentPassword"
          name="currentPassword"
          type="password"
          :error-string="error.current"
          @input="checkCurrentPassword"
        />
      </div>
      <div class="mb-6">
        <label class="capitalize">{{ t('newPassword') }}</label>
        <FormInput
          id="newPassword"
          v-model="passwordForm.newPassword"
          name="newPassword"
          type="password"
        />
      </div>
      <ApiError class="mb-4" :error-obj="errorMsgFromApi" />
      <div>
        <GeneralButton
          type="submit"
          :is-disabled="!userData.isOauthUser ? !canBeSaved.current : false"
        >
          {{ t('save') }}
        </GeneralButton>
      </div>
    </form>
  </div>
</template>
