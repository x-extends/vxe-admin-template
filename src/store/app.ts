import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { VxeUI, VxeGlobalThemeName, VxeGlobalI18nLocale, VxeComponentSizeType } from 'vxe-pc-ui'
import tinycolor2 from 'tinycolor2'
import { routeToMenuName } from '@/utils'
import { useUserStore } from './user'

function updatePrimaryColor (color: string) {
  if (color) {
    document.documentElement.style.setProperty('--vxe-ui-font-primary-color', color)
    document.documentElement.style.setProperty('--vxe-ui-font-primary-tinge-color', tinycolor2(color).lighten(28).toString())
    document.documentElement.style.setProperty('--vxe-ui-font-primary-lighten-color', tinycolor2(color).lighten(6).toString())
    document.documentElement.style.setProperty('--vxe-ui-font-primary-darken-color', tinycolor2(color).darken(12).toString())
    document.documentElement.style.setProperty('--vxe-ui-font-primary-disabled-color', tinycolor2(color).lighten(15).toString())
  } else {
    document.documentElement.style.removeProperty('--vxe-ui-font-primary-color')
    document.documentElement.style.removeProperty('--vxe-ui-font-primary-tinge-color')
    document.documentElement.style.removeProperty('--vxe-ui-font-primary-lighten-color')
    document.documentElement.style.removeProperty('--vxe-ui-font-primary-darken-color')
    document.documentElement.style.removeProperty('--vxe-ui-font-primary-disabled-color')
  }
}

const currTheme = (localStorage.getItem('APP_THEME') || 'light') as VxeGlobalThemeName
const currPrimaryColor = localStorage.getItem('VXE_DOCS_PRIMARY_COLOR')
const currComponentsSize = (localStorage.getItem('VXE_DOCS_COMPONENTS_SIZE') || '') as VxeComponentSizeType
const currLanguage = (localStorage.getItem('APP_LANGUAGE') || 'zh-CN') as VxeGlobalI18nLocale

VxeUI.setLanguage(currLanguage)
setTimeout(() => {
  VxeUI.setTheme(currTheme)
})

if (currPrimaryColor) {
  updatePrimaryColor(currPrimaryColor)
}

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      theme: currTheme,
      primaryColor: currPrimaryColor,
      componentsSize: currComponentsSize,
      language: currLanguage,
      collapseAside: false,
      pageKey: 0
    }
  },
  getters: {
  },
  actions: {
    /**
     * 设置主题
     * @param theme
     */
    setTheme (theme: VxeGlobalThemeName) {
      this.theme = theme
      VxeUI.setTheme(theme)
      localStorage.setItem('APP_THEME', theme || '')
    },
    setPrimaryColor (color: string) {
      updatePrimaryColor(color)
      this.primaryColor = color
      localStorage.setItem('VXE_DOCS_PRIMARY_COLOR', color)
    },
    setComponentsSize (size: VxeComponentSizeType) {
      this.componentsSize = size
      localStorage.setItem('VXE_DOCS_COMPONENTS_SIZE', size || '')
    },
    /**
     * 设置语言
     * @param language
     */
    setLanguage (language: VxeGlobalI18nLocale) {
      if (language !== this.language) {
        this.language = language
        VxeUI.setLanguage(language)
        localStorage.setItem('APP_LANGUAGE', language)
      }
    },
    /**
     * 设置左侧菜单收起与打开
     * @param status
     */
    setCollapseAside (status: boolean) {
      this.collapseAside = status
    },
    /**
     * 切换左侧菜单收起与打开
     */
    toggleCollapseAside () {
      this.collapseAside = !this.collapseAside
    },
    /**
     * 重新加载当前打开的路由页面
     */
    reloadPage () {
      const userStore = useUserStore()
      this.pageKey++
      userStore.updateUserInfo()
    },
    updatePageTitle (route: RouteLocationNormalizedLoadedGeneric) {
      const userStore = useUserStore()
      const menuItem = userStore.menuNameMaps[routeToMenuName(route)]
      const currTitle = menuItem ? menuItem.title : String(route.meta?.title || '')
      document.title = [currTitle, 'Vxe'].join(' - ')
    }
  }
})
