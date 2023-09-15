<script lang="ts" setup>
import { useCookies } from '@vueuse/integrations/useCookies'
import 'container-query-polyfill'
import mitt from 'mitt'
import { onMounted } from 'vue'
import { IProfileUser } from '@/types/general.interfaces'

type TViewTypes = 'profile' | 'license'

window.mitt = window.mitt || mitt()

const props = defineProps({
  baseApiUrl: {
    type: String,
    required: true
  },
  currentLanguage: {
    type: String,
    default: 'en'
  },
  userData: {
    type: String,
    default: '{}'
  },
  overrideBaseApiUrl: {
    type: String,
    default: ''
  },
  inactiveFields: {
    type: String,
    default: ''
  },
  view: {
    type: String as () => TViewTypes,
    default: 'profile'
  },
  readOnly: {
    type: [Boolean, String],
    default: false
  },
  localeSavingUrl: {
    type: String,
    default: ''
  }
})


const overrideBaseApiUrl = props.overrideBaseApiUrl?.length ? props.overrideBaseApiUrl : ''

provide('overrideBaseApiUrl', overrideBaseApiUrl)

const userDataObj = ref<IProfileUser>({})
userDataObj.value = props.view === 'profile' ? JSON.parse(props.userData) : {}

const inactiveFieldsArr: string[] = JSON.parse(props.inactiveFields)
const cookies = useCookies(['locale'])

onMounted(() => {
  const cookieLang = cookies.get('locale')
  setLanguage(cookieLang || props.currentLanguage)
})

const uniBool = (str: string | boolean) => {
  return typeof str === 'string' ? str === 'true' : str
}
</script>

<template>
  <div class="@container/tsxupmain tsxUserProfile flex flex-col gap-2">
    <ViewProfile
      v-if="view === 'profile'"
      :user-data="userDataObj"
      :inactive-fields="inactiveFieldsArr"
      :locale-saving-url="props.localeSavingUrl"
    />
    <ViewLicense
      v-if="view === 'license'"
      :read-only="uniBool(readOnly)"
      :inactive-fields="inactiveFieldsArr"
    />
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
