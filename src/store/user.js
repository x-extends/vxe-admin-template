import XEUtils from 'xe-utils'
import { VxeUI } from 'vxe-pc-ui'
import { getPubAdminLoginInfo, postPubAdminLoginValid, postPubAdminLogout } from '@/api/login'
import { postPubAdminUserCurrentChangeRole } from '@/api/user'

import { routeConfigToMenuName } from '@/utils'

const user = {
  state: {
    token: localStorage.getItem('TOKEN') || '',
    refreshToken: localStorage.getItem('REFRESH_TOKEN') || '1',
    activeUserTab: '',
    userTabs: [],
    userInfo: null
  },
  getters: {
    token: (state) => state.token,
    refreshToken: (state) => state.refreshToken,
    activeUserTab: (state) => state.activeUserTab,
    userTabs: (state) => state.userTabs,
    userInfo: (state) => state.userInfo,
    loginStatus (state) {
      return !!(state.token && state.userInfo)
    },
    userRoleLevel (state) {
      return state.userInfo ? state.userInfo.roleLevel : 900
    },
    menuTreeList (state, getters) {
      return [
        ...XEUtils.searchTree(getters.routeTreeList, (item) => {
          return item.type === 'menu'
        }, { isEvery: true, children: 'childList', mapChildren: 'children' })
      ]
    },
    menuAllTreeList (state, getters) {
      return [
        ...XEUtils.searchTree(getters.routeTreeList, () => true, { isEvery: true, children: 'childList', mapChildren: 'children' })
      ]
    },
    menuNameMaps (state, getters) {
      const codeMaps = {}
      XEUtils.eachTree(getters.routeTreeList, item => {
        codeMaps[item.name] = item
      }, { children: 'childList' })
      return codeMaps
    },
    defaultHomeMenu (state, getters) {
      const rest = XEUtils.findTree(getters.menuTreeList, (item) => item.routerLink)
      if (rest) {
        const { item } = rest
        return item
      }
      return null
    },
    routeConfigList (state) {
      const { userInfo } = state
      if (userInfo && userInfo.routeList) {
        return [...userInfo.routeList]
      }
      return []
    },
    routeTreeList (state) {
      const { userInfo } = state
      if (userInfo && userInfo.routeList) {
        const routeList = userInfo.routeList.map((item) => {
          const routeName = item.routeName
          const obj = {
            title: item.name,
            code: item.code,
            name: routeConfigToMenuName(item),
            parentCode: item.parentCode,
            routeName,
            icon: item.icon,
            type: item.type,
            menuType: 'route',
            routerLink: routeName
              ? {
                  name: routeName
                }
              : null
          }
          return obj
        })
        const rTreeList = XEUtils.toArrayTree(routeList, {
          key: 'code',
          parentKey: 'parentCode',
          children: 'childList'
        })
        return rTreeList
      }
      return []
    },
    routePermissionCodeList (state) {
      const { userInfo } = state
      const codeList = []
      if (userInfo && userInfo.routeList) {
        userInfo.routeList.forEach((item) => {
          codeList.push(item.routeName || item.code)
        })
      }
      return codeList
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setRefreshToken (state, refreshToken) {
      state.refreshToken = refreshToken
    },
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setUserTabs (state, tabs) {
      state.userTabs = tabs
    },
    setActiveUserTab (state, tab) {
      state.activeUserTab = tab
    }
  },
  actions: {
    /**
     * 刷新token
     */
    refreshTokenServer () {
      //
    },
    /**
     * 登陆
     */
    async loginServer ({ dispatch }, formData) {
      const res = await postPubAdminLoginValid(formData)
      dispatch('setToken', res.data)
      return dispatch('updateUserInfo')
    },
    /**
     * 退出登陆
     */
    logoutServer ({ dispatch }) {
      VxeUI.loading.open({
        text: '正在退出登录...'
      })
      return postPubAdminLogout({}).then(() => {
        dispatch('clearLogin')
        VxeUI.loading.close()
      }).catch((e) => {
        console.log(e)
        VxeUI.loading.close()
      })
    },
    initServer ({ dispatch, state }) {
      if (state.token) {
        return dispatch('updateUserInfo')
      }
      const e = false
      return Promise.reject(e)
    },
    setToken ({ commit }, data) {
      const { token, refreshToken } = data
      commit('setToken', token)
      commit('setRefreshToken', refreshToken)
      localStorage.setItem('TOKEN', token)
      localStorage.setItem('REFRESH_TOKEN', refreshToken)
    },
    /**
     * 清除登录信息
     */
    clearToken ({ commit }) {
      commit('setToken', '')
      commit('setRefreshToken', '')
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('REFRESH_TOKEN')
    },
    /**
     * 清除用户信息
     */
    clearUserInfo ({ commit }) {
      commit('setUserInfo', null)
    },
    /**
     * 清除登录信息
     */
    clearLogin ({ dispatch }) {
      dispatch('clearToken')
      dispatch('clearUserInfo')
      dispatch('clearUserTabs')
    },
    /**
     * 更新用户信息
     */
    async updateUserInfo ({ commit }) {
      const res = await getPubAdminLoginInfo()
      commit('setUserInfo', res.data)
    },
    /**
     * 切换角色
     * @param roleCode
     * @returns
     */
    async changeUserRole ({ dispatch, state }, roleCode) {
      const item = state.userInfo?.roleList.find((item) => item.value === roleCode)
      if (!item) {
        return
      }
      VxeUI.loading.open({
        text: '正在切换角色'
      })
      await postPubAdminUserCurrentChangeRole({ roleCode: item.value })
      dispatch('clearUserTabs')
      await dispatch('updateUserInfo')
      VxeUI.loading.close()
      VxeUI.modal.message({
        content: `已切换到 “${item.label}” 角色`,
        status: 'success'
      })
    },
    /**
     * 清除所有页签
     */
    clearUserTabs ({ commit }) {
      commit('setActiveUserTab', '')
      commit('setUserTabs', [])
    },
    /**
     * 更新页签
     * @param tab
     */
    updateUserTabs ({ commit, state }, tab) {
      if (!state.userTabs.some((item) => item.name === tab.name)) {
        commit('setUserTabs', state.userTabs.concat(
          {
            name: tab.name,
            routeName: tab.routeName,
            path: tab.path,
            query: tab.query,
            params: tab.params
          }
        ))
      }
      commit('setActiveUserTab', tab.name)
    },
    /**
     * 关闭页签
     * @param tab
     * @returns
     */
    removeUserTab ({ commit, state }, tab) {
      const index = XEUtils.findIndexOf(state.userTabs, item => item.name === tab.name)
      if (index > -1) {
        if (tab.name === state.activeUserTab) {
          const nextItem = state.userTabs[index + 1] || state.userTabs[index - 1]
          if (nextItem) {
            commit('setActiveUserTab', nextItem.name)
            state.userTabs.splice(index, 1)
            commit('setUserTabs', [...state.userTabs])
            return nextItem
          }
        }
        state.userTabs.splice(index, 1)
        commit('setUserTabs', [...state.userTabs])
      }
      return null
    },
    /**
     * 清除页签
     * @param type
     */
    clearUserTab ({ commit, state }, type) {
      const index = XEUtils.findIndexOf(state.userTabs, item => item.name === state.activeUserTab)
      switch (type) {
        case 'closeOther':
          commit('setUserTabs', state.userTabs.filter((item) => item.name === state.activeUserTab))
          break
        case 'closeLeft':
          commit('setUserTabs', state.userTabs.slice(index))
          break
        case 'closeRight':
          state.userTabs.slice(0, index + 1)
          commit('setUserTabs', [...state.userTabs])
          break
      }
    }
  }
}

export default user
