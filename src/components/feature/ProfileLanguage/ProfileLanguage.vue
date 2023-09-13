<script lang="ts" setup>
import VueMultiselect from 'vue-multiselect'
import { useCookies } from '@vueuse/integrations/useCookies'
import axios from 'axios'

interface ILanguageMatrix {
  [key: string]: {
    label: string
    short: string
  }
}

const props = defineProps({
  localeSavingUrl: {
    type: String,
    default: ''
  }
})

const cookies = useCookies(['locale'])
const languageSavedInfo = ref(false)
const language = ref<null|string>(null)

const languages: ILanguageMatrix = {
  en: {
    label: 'English',
    short: 'ENG'
  },
  de: {
    label: 'Deutsch',
    short: 'DEU'
  },
  ru: {
    label: 'Русский',
    short: 'РУС'
  },
  es: {
    label: 'Español',
    short: 'ESP'
  },
  pt: {
    label: 'Português (Brasil)',
    short: 'POR'
  },
  fr: {
    label: 'Français',
    short: 'FRA'
  },
  it: {
    label: 'Italiano',
    short: 'ITA'
  },
  ja: {
    label: '日本語',
    short: '日本語'
  }
}

const setLanguageCookie = (lang: string) => cookies.set('locale', lang, {
  path: '/',
  sameSite: 'lax',
  maxAge: 31536000,
  domain: `.${window.location.hostname}`
})

onMounted(() => {
  language.value = getLanguage()
})

const changeLanguage = async () => {
  try {
    setLanguage(language.value as string)
    if (props.localeSavingUrl.length) {
      await axios.put(props.localeSavingUrl, { localeCode: language.value }, { withCredentials: true })
    } else {
      setLanguageCookie(language.value as string)
    }
    window.mitt.emit('tsxUserProfile:changeLanguage', language.value)
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <ProfileDetailBox
    class="profileLanguage"
  >
    <div class="p-6">
      <div class="text-base font-medium mb-4">
        {{ t('language') }}
      </div>
      <div class="smoothGridBox">
        <div class="w-full relative">
          <StatusMessage
            v-if="languageSavedInfo"
            class="mb-4"
            aria-label="statusMessage"
          >
            {{ t('timezoneInfo') }}
          </StatusMessage>
          <VueMultiselect
            v-model="language"
            :options="Object.keys(languages)"
            :searchable="true"
            :close-on-select="true"
            :allow-empty="false"
            :custom-label="(opt:string) => languages[opt].label"
            placeholder=""
            select-label=""
            deselect-label=""
            selected-label=""
            @select="changeLanguage"
          >
            <template #option="props">
              <div class="option__desc">
                <div class="option__title flex gap-2 items-center">
                  <LanguageFlags :lang="props.option" class="w-3" />
                  {{ languages[props.option].label }}
                </div>
              </div>
            </template>
          </VueMultiselect>
        </div>
      </div>
    </div>
  </ProfileDetailBox>
</template>
