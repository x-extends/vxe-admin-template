import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { VxeUI, VxeGlobalThemeName, VxeGlobalI18nLocale } from 'vxe-pc-ui'
import { routeToMenuName } from '@/utils'
import { useUserStore } from './user'

const currTheme = (localStorage.getItem('APP_THEME') || 'light') as VxeGlobalThemeName
const currLanguage = (localStorage.getItem('APP_LANGUAGE') || 'zh-CN') as VxeGlobalI18nLocale

VxeUI.setLanguage(currLanguage)
setTimeout(() => {
  VxeUI.setTheme(currTheme)
})

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      theme: currTheme,
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
