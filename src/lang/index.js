import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
import elementJaLocale from 'element-ui/lib/locale/lang/ja'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import jaLocale from './ja'
import axios from 'axios'
Vue.use(VueI18n)
// let request = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API,
//   timeout: 10000 ,
//   headers: {'language': Cookies.get('language')?Cookies.get('language'):'zh'}
// })

let messages={}

  messages = {
    en: {
      ...enLocale,
      ...elementEnLocale
    },
    zh: {
      ...zhLocale,
      ...elementZhLocale
    },
    es: {
      ...esLocale,
      ...elementEsLocale
    },
    ja: {
      ...jaLocale,
      ...elementJaLocale
    }
  }

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage){
    return chooseLanguage
  } 
  else{
    Cookies.set('language','en') 
    return 'en'
  }

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      Cookies.set('language',locale) 
      return locale
    }
  }
  Cookies.set('language','en') 
  return 'en'
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
