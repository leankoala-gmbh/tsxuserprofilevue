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
  }
})



const overrideBaseApiUrl = computed(() => props.overrideBaseApiUrl?.length ? props.overrideBaseApiUrl : '')

provide('overrideBaseApiUrl', overrideBaseApiUrl.value)

const userDataObj = computed<IProfileUser>(() => props.view === 'profile' ? JSON.parse(props.userData) : {})
const inactiveFieldsArr = computed<string[]>(() => JSON.parse(props.inactiveFields))
const cookies = useCookies(['locale'])

const cookieLang = ref('')
onMounted(() => {
  if (!cookies.get('locale')) {
    cookies.set('locale', cookies.get('i18n_redirected'), {
      path: '/',
      sameSite: 'lax',
      maxAge: 31536000,
      domain: `.${window.location.hostname}`
    } )
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

const openCanvasStyle = () => {
  body!.style.overflow = 'hidden'
  isActiveBackground.value = true
  setTimeout(() => {
    isOpenCanvas.value = true
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

const canvasView = ref('')

window.mitt.on('tsxUserProfile', (data: any) => {
  if (data.action === 'openCanvas' && data.view) {
    console.log('openCanvas', data.view)
    canvasView.value = data.view
    openCanvasStyle()
  }
})
</script>

<template>
  <div class="">
    <template v-if="!offCanvas">
      <div class="@container/tsxupmain tsxUserProfile flex flex-col gap-2">
      <ViewProfile
        v-if="view === 'profile'"
        :user-data="userDataObj"
        :inactive-fields="inactiveFieldsArr"
        :locale-saving-url="props.localeSavingUrl"
        :current-lang="cookieLang"
        :token="token"
      />
      <ViewLicense
        v-if="view === 'license'"
        :read-only="uniBool(readOnly)"
        :inactive-fields="inactiveFieldsArr"
        />
      </div>
    </template>
    <template v-else>
      <div
        class="screenOverlay fixed z-10 h-screen w-screen bg-trans-black-08 top-0 right-0 transition-opacity duration-300 ease-in-out backdrop-filter backdrop-blur-sm"
        :class="[isActiveBackground ? 'screenOverlay--open': '']"
      />
      <transition name="slide">
        <div
          v-if="isActiveBackground"
          class="fixed top-0 right-0 w-full max-w-[600px] @container/tsxupmain tsxUserProfile guideScreen transition-all duration-300 ease-in-out z-[10001] flex flex-col h-screen p-4">
        <div
          class="overflow-hidden overflow-y-auto bg-white rounded-lg shadow-lg flex-auto"
        >
          <div class="p-4 border-b flex items-center justify-between">
            <div class="text-xl font-bold">
              {{ view === 'profile' ? t('Profile') : t('License') }}
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
            :inactive-fields="inactiveFieldsArr"
            :locale-saving-url="props.localeSavingUrl"
            :current-lang="cookieLang"
            :token="token"
          />
          <ViewLicense
            v-if="canvasView === 'license'"
            class="p-4"
            :read-only="uniBool(readOnly)"
            :inactive-fields="inactiveFieldsArr"
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
