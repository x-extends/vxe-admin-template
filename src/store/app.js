import { VxeUI } from 'vxe-pc-ui'
import { routeToMenuName } from '@/utils'
import tinycolor2 from 'tinycolor2'

function updatePrimaryColor (color) {
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

const currTheme = (localStorage.getItem('VXE_DOCS_THEME') || 'light')
const currPrimaryColor = localStorage.getItem('VXE_DOCS_PRIMARY_COLOR')
const currComponentsSize = (localStorage.getItem('VXE_DOCS_COMPONENTS_SIZE') || '')
const currLanguage = (localStorage.getItem('VXE_DOCS_LANGUAGE') || 'zh-CN')

VxeUI.setLanguage(currLanguage)
setTimeout(() => {
  VxeUI.setTheme(currTheme)
})

if (currPrimaryColor) {
  updatePrimaryColor(currPrimaryColor)
}

const app = {
  state: {
    theme: currTheme,
    primaryColor: currPrimaryColor,
    componentsSize: currComponentsSize,
    language: currLanguage,
    collapseAside: false,
    pageKey: 0
  },
  getters: {
    theme: (state) => state.theme,
    language: (state) => state.language,
    primaryColor: (state) => state.primaryColor,
    componentsSize: (state) => state.componentsSize,
    collapseAside: (state) => state.collapseAside,
    pageKey: (state) => state.pageKey
  },
  mutations: {
    setTheme (state, theme) {
      state.theme = theme
      VxeUI.setTheme(theme)
      localStorage.setItem('APP_THEME', theme || '')
    },
    setPrimaryColor (state, color) {
      updatePrimaryColor(color)
      state.primaryColor = color
      localStorage.setItem('VXE_DOCS_PRIMARY_COLOR', color)
    },
    setComponentsSize (state, size) {
      state.componentsSize = size
      localStorage.setItem('VXE_DOCS_COMPONENTS_SIZE', size || '')
    },
    setLanguage (state, language) {
      state.language = language
      VxeUI.setLanguage(language)
      localStorage.setItem('APP_LANGUAGE', language)
    },
    setCollapseAside (state, status) {
      state.collapseAside = status
    },
    setPageKey (state, key) {
      state.pageKey = key
    }
  },
  actions: {
    /**
     * 设置左侧菜单收起与打开
     * @param status
     */
    setCollapseAside ({ commit }, status) {
      commit('setCollapseAside', status)
    },
    /**
     * 切换左侧菜单收起与打开
     */
    toggleCollapseAside ({ state, commit }) {
      commit('setCollapseAside', !state.collapseAside)
    },
    /**
     * 重新加载当前打开的路由页面
     */
    reloadPage ({ state, commit, dispatch }) {
      commit('setPageKey', state.pageKey + 1)
      dispatch('updateUserInfo')
    },
    updatePageTitle ({ rootGetters }, route) {
      const menuItem = rootGetters.menuNameMaps[routeToMenuName(route)]
      const currTitle = menuItem ? menuItem.title : String(route.meta?.title || '')
      document.title = [currTitle, 'Vxe'].join(' - ')
    }
  }
}

export default app
