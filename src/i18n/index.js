import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { VxeUI } from 'vxe-pc-ui'
import enUS from 'vxe-pc-ui/lib/language/en-US'

Vue.use(VueI18n)

const languageList = ['zh-CN', 'en-US']
const customLanguage = localStorage.getItem('APP_LANGUAGE')
const i18n = new VueI18n({
  locale: customLanguage && languageList.includes(customLanguage) ? customLanguage : ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'].includes(navigator.language) ? 'zh-CN' : 'en-US',
  messages: {}
})

VxeUI.setI18n('en-US', enUS)

export default i18n
