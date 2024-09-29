import { VxeUI } from 'vxe-pc-ui'
import { routeToMenuName } from '@/utils'

const currTheme = (localStorage.getItem('APP_THEME') || 'light')
const currLanguage = (localStorage.getItem('APP_LANGUAGE') || 'zh-CN')

VxeUI.setLanguage(currLanguage)
setTimeout(() => {
  VxeUI.setTheme(currTheme)
})

const app = {
  state: {
    vxeVersion: process.env.VUE_APP_VXE_VERSION,
    theme: currTheme,
    language: currLanguage,
    collapseAside: false,
    pageKey: 0
  },
  getters: {
    vxeVersion: (state) => state.vxeVersion,
    theme: (state) => state.theme,
    language: (state) => state.language,
    collapseAside: (state) => state.collapseAside,
    pageKey: (state) => state.pageKey
  },
  mutations: {
    setTheme (state, theme) {
      state.theme = theme
    },
    setLanguage (state, language) {
      state.language = language
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
     * 设置主题
     * @param theme
     */
    setTheme ({ commit }, theme) {
      commit('setTheme', theme)
      VxeUI.setTheme(theme)
      localStorage.setItem('APP_THEME', theme || '')
    },
    /**
     * 设置语言
     * @param language
     */
    setLanguage ({ state, commit }, language) {
      if (language !== state.language) {
        commit('setTheme', language)
        VxeUI.setLanguage(language)
        localStorage.setItem('APP_LANGUAGE', language)
      }
    },
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
