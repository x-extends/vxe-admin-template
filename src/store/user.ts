import XEUtils from 'xe-utils'
import { defineStore } from 'pinia'
import { VxeUI } from 'vxe-pc-ui'
import { getPubAdminLoginInfo, postPubAdminLoginValid, postPubAdminLogout } from '@/api/login'
import { postPubAdminUserCurrentChangeRole, UserInfoVO, UserMenuVO } from '@/api/user'

import { routeConfigToMenuName } from '@/utils'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
      refreshToken: localStorage.getItem('REFRESH_TOKEN'),
      activeUserTab: '',
      userTabs: [] as any[],
      userInfo: null as UserInfoVO | null
    }
  },
  getters: {
    loginStatus (state) {
      return !!(state.token && state.userInfo)
    },
    userRoleLevel (state) {
      return state.userInfo ? state.userInfo.roleLevel : 900
    },
    menuTreeList () {
      return [
        ...XEUtils.searchTree(this.routeTreeList, (item) => {
          return item.type === 'menu'
        }, { isEvery: true, children: 'childList', mapChildren: 'children' })
      ] as UserMenuVO[]
    },
    menuAllTreeList () {
      return [
        ...XEUtils.searchTree(this.routeTreeList, () => true, { isEvery: true, children: 'childList', mapChildren: 'children' })
      ] as UserMenuVO[]
    },
    menuNameMaps () {
      const codeMaps: Record<string, UserMenuVO> = {}
      XEUtils.eachTree(this.routeTreeList, item => {
        codeMaps[item.name] = item
      }, { children: 'childList' })
      return codeMaps
    },
    defaultHomeMenu (this: any) {
      const rest = XEUtils.findTree(this.menuTreeList, (item: any) => item.routerLink)
      if (rest) {
        const { item } = rest
        return item as UserMenuVO
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
        const routeList = userInfo.routeList.map(item => {
          const routeName = item.routeName
          const obj: UserMenuVO = {
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
      const codeList: string[] = []
      if (userInfo && userInfo.routeList) {
        userInfo.routeList.forEach(item => {
          codeList.push(item.routeName || item.code)
        })
      }
      return codeList
    }
  },
  actions: {
    /**
     * 刷新token
     */
    refreshTokenServer () {
    },
    /**
     * 登陆
     */
    async loginServer (formData?: { name: string, password: string }): Promise<void> {
      const res = await postPubAdminLoginValid(formData)
      this.setToken(res.data)
      return this.updateUserInfo()
    },
    /**
     * 退出登陆
     */
    logoutServer (): Promise<void> {
      VxeUI.loading.open({
        text: '正在退出登录...'
      })
      return postPubAdminLogout({}).then(() => {
        this.clearLogin()
        VxeUI.loading.close()
      }).catch((e) => {
        console.log(e)
        VxeUI.loading.close()
      })
    },
    initServer () {
      if (this.token) {
        return this.updateUserInfo()
      }
      const e = false
      return Promise.reject(e)
    },
    setToken (data: any) {
      const { token, refreshToken } = data
      this.token = token
      this.refreshToken = refreshToken
      localStorage.setItem('TOKEN', token)
      localStorage.setItem('REFRESH_TOKEN', refreshToken)
    },
    /**
     * 清除登录信息
     */
    clearToken () {
      this.token = ''
      this.refreshToken = ''
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('REFRESH_TOKEN')
    },
    /**
     * 清除用户信息
     */
    clearUserInfo () {
      this.userInfo = null
    },
    /**
     * 清除登录信息
     */
    clearLogin () {
      this.clearToken()
      this.clearUserInfo()
      this.clearUserTabs()
    },
    /**
     * 更新用户信息
     */
    async updateUserInfo () {
      const res = await getPubAdminLoginInfo()
      this.userInfo = res.data
    },
    /**
     * 切换角色
     * @param roleCode
     * @returns
     */
    async changeUserRole (roleCode: any) {
      const item = this.userInfo?.roleList.find(item => item.value === roleCode)
      if (!item) {
        return
      }
      VxeUI.loading.open({
        text: '正在切换角色'
      })
      await postPubAdminUserCurrentChangeRole({ roleCode: item.value })
      this.clearUserTabs()
      await this.updateUserInfo()
      VxeUI.loading.close()
      VxeUI.modal.message({
        content: `已切换到 “${item.label}” 角色`,
        status: 'success'
      })
    },
    /**
     * 清除所有页签
     */
    clearUserTabs () {
      this.activeUserTab = ''
      this.userTabs = []
    },
    /**
     * 更新页签
     * @param tab
     */
    updateUserTabs (tab: {
      path: string
      name: any
      routeName: any
      query: any
      params: any
    }) {
      if (!this.userTabs.some(item => item.name === tab.name)) {
        this.userTabs.push({
          name: tab.name,
          routeName: tab.routeName,
          path: tab.path,
          query: tab.query,
          params: tab.params
        })
      }
      this.activeUserTab = tab.name
    },
    /**
     * 关闭页签
     * @param tab
     * @returns
     */
    removeUserTab (tab: {
      name: any
    }) {
      const index = XEUtils.findIndexOf(this.userTabs, item => item.name === tab.name)
      if (index > -1) {
        if (tab.name === this.activeUserTab) {
          const nextItem = this.userTabs[index + 1] || this.userTabs[index - 1]
          if (nextItem) {
            this.activeUserTab = nextItem.name
            this.userTabs.splice(index, 1)
            return nextItem
          }
        }
        this.userTabs.splice(index, 1)
      }
      return null
    },
    /**
     * 清除页签
     * @param type
     */
    clearUserTab (type: 'closeOther' | 'closeLeft' | 'closeRight') {
      const index = XEUtils.findIndexOf(this.userTabs, item => item.name === this.activeUserTab)
      switch (type) {
        case 'closeOther':
          this.userTabs = this.userTabs.filter(item => item.name === this.activeUserTab)
          break
        case 'closeLeft':
          this.userTabs = this.userTabs.slice(index)
          break
        case 'closeRight':
          this.userTabs = this.userTabs.slice(0, index + 1)
          break
      }
    }
  }
})
