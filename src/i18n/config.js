
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './ar.json'
import en from './en.json'

const savedLanguage = localStorage.getItem('uw-language')
const browserLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en'

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en }
  },
  lng: ['ar', 'en'].includes(savedLanguage)
    ? savedLanguage
    : browserLanguage,
  fallbackLng: 'ar',
  interpolation: { escapeValue: false }
})

export default i18n
