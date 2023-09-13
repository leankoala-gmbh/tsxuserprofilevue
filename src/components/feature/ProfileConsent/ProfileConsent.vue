<script lang="ts" setup>
import { IApiError, IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const savedConsent = ref(false)
const api = useApiAbstraction()
const requestAfterMount = ref(false)

const getInitialConsent = async () => {
  try {
    const res = await api.getConsent()
    savedConsent.value = res
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  getInitialConsent()
})

const consentConfirm = computed(() => {
  return savedConsent.value ? t('consentSuccess') : t('consentRevoke')
})

const disabledCheckbox = ref(false)
const statusState = ref(false)

const statusSwtich = () => {
  if (requestAfterMount.value) {
    statusState.value = true
    setTimeout(() => {
      statusState.value = false
    }, 3000)
  }
}

const errorMsgFromApi = ref<IApiError>()

const saveConsent = async () => {
  errorMsgFromApi.value = undefined
  if (savedConsent.value === undefined) return
  try {
    disabledCheckbox.value = true
    await api.setConsent(savedConsent.value)
    statusSwtich()
  } catch (e: any) {
    errorMsgFromApi.value = e.response.data
  } finally {
    disabledCheckbox.value = false
  }
}

watch(() => savedConsent.value, () => {
  saveConsent()
})
</script>

<template>
  <ProfileDetailBox
    class="profileConsent"
  >
    <div class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer smoothGridBox">
      <StatusMessage
        v-if="statusState"
        type="success"
        class="mb-4"
      >
        {{ consentConfirm }}
      </StatusMessage>
      <label class="flex gap-4">
        <div class="pt-1">
          <input
            v-model="savedConsent"
            type="checkbox"
            :disabled="disabledCheckbox"
            aria-label="input"
            @change="requestAfterMount = true"
          >
        </div>
        <div>
          <h3 class="font-medium mb-2 text-base">{{ t('consentHeadline') }}</h3>
          <p class="text-gray-600 text-sm">{{ t('consentBody') }}</p>
        </div>
      </label>
      <ApiError class="mt-4" :error-obj="errorMsgFromApi" />
    </div>
  </ProfileDetailBox>
</template>
