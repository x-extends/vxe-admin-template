import Vue from 'vue'
import VueRouter from 'vue-router'
import { VxeUI } from 'vxe-pc-ui'
import { routeConfigs } from './config'
import store from '@/store'
import { routeToMenuName } from '@/utils'
import NProgress from 'nprogress'

const routeFnNames = ['push', 'replace']
routeFnNames.forEach(key => {
  const fn = VueRouter.prototype[key]
  VueRouter.prototype[key] = function (location, onResolve, onReject) {
    if (onResolve || onReject) {
      return fn.call(this, location, onResolve, onReject)
    }
    return fn.call(this, location).catch(err => err)
  }
})

Vue.use(VueRouter)

const publicRouteList = [
  'PageError404',
  'PageError403',
  'LoginView',
  'RegisterView'
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routeConfigs
})

const handleRoutePermission = (to, _from, next) => {
  // 如果是默认首页
  if (to.path === '/') {
    const defaultHomeMenu = store.getters.defaultHomeMenu
    if (defaultHomeMenu) {
      next({
        ...defaultHomeMenu.routerLink,
        replace: true
      })
      return
    }
    console.log('无默认菜单', to)
    next({
      name: 'PageError403'
    })
    return
  }
  // 检查权限
  if (VxeUI.permission.checkVisible(to.name)) {
    next()
    return
  }
  console.log('无权限访问', to)
  next({
    name: 'PageError403'
  })
}

router.beforeEach((to, from, next) => {
  NProgress.start()

  // 如果为白名单
  if (publicRouteList.includes(String(to.name))) {
    next()
    return
  }
  // 判断是否登录状态
  if (store.getters.loginStatus) {
    handleRoutePermission(to, from, next)
    return
  }
  store.dispatch('initServer').then(() => {
    handleRoutePermission(to, from, next)
  }).catch(() => {
    next({
      name: 'LoginView'
    })
  })
})

router.afterEach((to) => {
  // 更新页签
  if (store.getters.loginStatus) {
    store.dispatch('updateUserTabs', {
      path: to.fullPath,
      routeName: to.name,
      name: routeToMenuName(to),
      query: to.query,
      params: to.params
    })
  }
  // 更新标题
  store.dispatch('updatePageTitle', to)
  NProgress.done()
})

export default router
