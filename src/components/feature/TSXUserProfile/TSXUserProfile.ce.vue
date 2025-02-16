<script lang="ts" setup>
import { useCookies } from '@vueuse/integrations/useCookies'
import 'container-query-polyfill'
import mitt from 'mitt'
import { onMounted } from 'vue'

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
  },
  token: {
    type: String,
    default: ''
  },
  offCanvas: {
    type: Boolean,
    default: false
  },
  openCanvas: {
    type: Boolean,
    default: false
  },
  isLicensePartner: {
    type: Boolean,
    default: false
  },
  partnerType: {
    type: String,
    default: ''
  },
  // isDeleteAble: {
  //   type: Boolean,
  //   default: false
  // },
  completeUpsellUrl: {
    type: String,
    default: ''
  }
})

const overrideBaseApiUrl = computed(() => props.overrideBaseApiUrl?.length ? props.overrideBaseApiUrl : '')

provide('overrideBaseApiUrl', overrideBaseApiUrl.value)

const cookies = useCookies(['locale'])

const cookieLang = ref('')

const createCookie = (key: string, value: string) => {
  cookies.set(key, value, {
    path: '/',
    sameSite: 'lax',
    maxAge: 31536000,
    domain: `.${window.location.hostname}`
  })
}

onMounted(() => {
  if (!cookies.get('locale') || cookies.get('locale') === 'undefined') {
    if (cookies.get('i18n_redirected')) createCookie('locale', cookies.get('i18n_redirected'))
    else {
      createCookie('i18n_redirected', 'en')
      createCookie('locale', 'en')
    }
  }
  cookieLang.value = cookies.get('locale')
  setLanguage(cookieLang.value)
})

const uniBool = (str: string | boolean) => {
  return typeof str === 'string' ? str === 'true' : str
}

const body = document.querySelector('body')
const isActiveBackground = ref(false)
const isOpenCanvas = ref(false)
const canvasView = ref('')

const openCanvasStyle = (view: string) => {
  body!.style.overflow = 'hidden'
  isActiveBackground.value = true
  setTimeout(() => {
    isOpenCanvas.value = true
    canvasView.value = view
  }, 100)
}

const closeCanvasStyle = () => {
  isOpenCanvas.value = false
  setTimeout(() => {
    isActiveBackground.value = false
    body!.style.overflow = 'auto'
    canvasView.value = ''
  }, 100)
}

window.mitt.on('tsxUserProfile', (data: any) => {
  if (data.action === 'openCanvas' && data.view) {
    openCanvasStyle(data.view)
  }
})

const setGravatar = (baseavatar: any) => {
  if (baseavatar && baseavatar.includes('s=40')) {
    return baseavatar.replace('s=40', 's=200')
  }
  return baseavatar
}

const userDataObj = computed(() => {
  /*
  email, name, avatar, timezone, nixstatsId, threeSixtyId, globalUserInformation
  */
  const userData = JSON.parse(props.userData)
  const getGravatarOrAvatar = userData.gravatar ? setGravatar(userData.gravatar) : userData.avatar

  return {
    email: userData.email,
    name: userData.name,
    gravatar: setGravatar(getGravatarOrAvatar),
    timezone: userData.timezone,
    nixstatsId: userData.nixstatsId,
    threeSixtyId: userData.threeSixtyId,
    ...userData.globalUserInformation
  }
})

const realPartnerType = computed(() => {
  const isALicensePartner = userDataObj.value.isLicensePartner

  if (props.partnerType === 'standalone') {
    if (isALicensePartner) {
      return 'standalonePartner'
    }
    return 'standaloneRetail'
  }
  return props.partnerType?.length ? props.partnerType : 'default'
})

const inactiveFields = computed(() => {
  const matrix: { [key: string]: string[] } = {
    default: [],
    standaloneRetail: [],
    standalonePartner: ['consent', 'comparePlansLink'],
    whitelabel: ['naming', 'password', 'consent'],
    platform: ['naming', 'password', 'consent'],
    partner: ['consent', 'comparePlansLink']
  }

  const selectedConf = matrix[realPartnerType.value] || matrix.default


  if (!userDataObj.value.isDeletable) {
    selectedConf.push('removeAccount')
  }

  return selectedConf
})

const scrollAbleContainer = ref(true)
const buyANewLicense = () => {
  scrollAbleContainer.value = false
}

watch(() => canvasView.value, () => {
  if (canvasView.value === '') {
    scrollAbleContainer.value = true
  }
}, { immediate: true })
</script>

<template>
  <div>
    <template v-if="!uniBool(offCanvas)">
      <div class="@container/tsxupmain tsxUserProfile flex flex-col gap-2">
      <ViewProfile
        v-if="view === 'profile'"
        :user-data="userDataObj"
        :inactive-fields="inactiveFields"
        :locale-saving-url="props.localeSavingUrl"
        :current-lang="cookieLang"
        :token="token"
      />
      <ViewLicense
        v-if="view === 'license'"
        :read-only="uniBool(readOnly)"
        :inactive-fields="inactiveFields"
        />
      </div>
    </template>
    <template v-else>
      <div
        class="screenOverlay fixed z-[10010] h-screen w-screen bg-trans-black-08 top-0 right-0 transition-opacity duration-300 ease-in-out backdrop-filter backdrop-blur-sm"
        :class="[isActiveBackground ? 'screenOverlay--open': '']"
      />
      <transition name="slide">
        <div
          v-if="isActiveBackground"
          class="fixed top-0 right-0 w-full max-w-[600px] @container/tsxupmain tsxUserProfile guideScreen transition-all duration-300 ease-in-out z-[10020] flex flex-col h-screen p-4">
        <div class="overflow-hidden bg-white rounded-lg shadow-lg flex-auto"
          :class="[scrollAbleContainer ? 'overflow-y-auto' : '']"
        >
          <div class="p-4 border-b flex items-center justify-between">
            <div class="text-xl font-bold">
              {{ canvasView === 'profile' ? t('Profile') : t('License') }}
            </div>
            <button @click="closeCanvasStyle">
              <div
                class="text-gray-500 hover:text-gray-500 transition duration-300 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  class="w-4"
                >
                  <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" fill="currentColor" />
                </svg>
              </div>
            </button>
          </div>
          <ViewProfile
            v-if="canvasView === 'profile'"
            :user-data="userDataObj"
            :inactive-fields="inactiveFields"
            :locale-saving-url="props.localeSavingUrl"
            :current-lang="cookieLang"
            :token="token"
          />
          <ViewLicense
            v-if="canvasView === 'license'"
            class="p-4"
            :read-only="uniBool(readOnly)"
            :inactive-fields="inactiveFields"
            :complete-upsell-url="completeUpsellUrl"
            @buy-a-new-license="buyANewLicense"
          />
        </div>
      </div>
      </transition>
    </template>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
