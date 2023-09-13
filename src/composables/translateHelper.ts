import locales from '@/locales/loader'
import { ref } from 'vue'

interface ILocales {
  [key: string]: {
    [key: string]: string
  }
}

const currentLanguage = ref<string>('en')

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
