import { createI18n } from 'vue-i18n'
import { VxeUI } from 'vxe-pc-ui'
import enUS from 'vxe-pc-ui/es/language/en-US'

const languageList = ['zh-CN', 'en-US']
const customLanguage = localStorage.getItem('APP_LANGUAGE')
const i18n = createI18n({
  warnHtmlMessage: false,
  locale: customLanguage && languageList.includes(customLanguage) ? customLanguage : ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'].includes(navigator.language) ? 'zh-CN' : 'en-US',
  messages: {}
})

VxeUI.setI18n('en-US', enUS)

export default i18n
