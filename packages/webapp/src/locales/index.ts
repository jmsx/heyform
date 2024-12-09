import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import formComponentsLocales from '../pages/form/views/FormComponents/locales'

import en from './en'
import pl from './pl'
import tr from './tr'
import zhCn from './zhCn'
import zhTw from './zhTw'
import es from './es'

const resources = {
  en: {
    translation: {
      ...en,
      ...formComponentsLocales.en.translation
    }
  },
  es: {
    translation: {
      ...es,
      ...formComponentsLocales.es.translation
    }
  },
  pl: {
    translation: {
      ...pl,
      ...formComponentsLocales.pl.translation
    }
  },
  tr: {
    translation: {
      ...tr,
      ...formComponentsLocales.tr.translation
    }
  },
  'zh-cn': {
    translation: {
      ...zhCn,
      ...formComponentsLocales['zh-cn'].translation
    }
  },
  'zh-tw': {
    translation: {
      ...zhTw,
      ...formComponentsLocales['zh-tw'].translation
    }
  },
  fr: formComponentsLocales.fr,
  de: formComponentsLocales.de
}

const LANG_ALIASES: Record<string, string> = {
  'zh-hans': 'zh-cn',
  'zh-hant': 'zh-tw',
  'pl-pl': 'pl'
}

const supportedLngs = Object.keys(resources)
const fallbackLng = supportedLngs[0]

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: import.meta.env.DEV,
    lowerCaseLng: true,
    resources,
    fallbackLng,
    supportedLngs,
    interpolation: {
      escapeValue: false
    },
    react: {
      // https://react.i18next.com/latest/trans-component#trans-props
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'b', 'i', 'a']
    },
    detection: {
      order: ['cookie', 'navigator', 'htmlTag'],
      caches: ['cookie'],
      lookupCookie: 'locale',
      convertDetectedLanguage: (lng: string) => {
        const lowerLng = lng.toLowerCase()

        if (LANG_ALIASES[lowerLng]) {
          return LANG_ALIASES[lowerLng]
        }

        return lng
      }
    }
  })

export default i18n
