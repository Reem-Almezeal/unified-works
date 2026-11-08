
import { createContext, useContext, useEffect, useState } from 'react'
import i18n from '../i18n/config'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(i18n.language)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('uw-language', language)
  }, [language])

  const changeLanguage = async (nextLanguage) => {
    await i18n.changeLanguage(nextLanguage)
    setLanguage(nextLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
