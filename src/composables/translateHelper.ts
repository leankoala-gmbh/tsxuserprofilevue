import locales from '@/locales/loader'
import { useCookies } from '@vueuse/integrations/useCookies'
import { ref } from 'vue'
interface ILocales {
  [key: string]: {
    [key: string]: string
  }
}

const cookies = useCookies(['locale'])

const currentLanguage = ref<string>(cookies.get('locale') || 'en')

export function t (key: string, dynamicVars : null|{[key: string]: string} = null) : string {
  const translations: ILocales = locales()
  const languageSpectrum = Object.keys(translations)

  if (languageSpectrum.includes(currentLanguage.value)) {
    const translationString = translations[currentLanguage.value][key]
    if (!translationString) return key
    if (!dynamicVars || typeof dynamicVars !== 'object') return translationString
    return translationString.replace(/{([^}]+)}/g, (match, rkey) => dynamicVars[rkey] || match)
  }
  return key
}

export function setLanguage (lang: string) {
  currentLanguage.value = lang
}

export function getLanguage (): string {
  return currentLanguage.value
}
