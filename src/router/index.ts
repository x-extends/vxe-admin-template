import { createRouter, createWebHashHistory, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric, NavigationGuardNext } from 'vue-router'
import { VxeUI } from 'vxe-pc-ui'
import { routeConfigs } from './config'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { routeToMenuName } from '@/utils'
import NProgress from 'nprogress'

const publicRouteList = [
  'PageError404',
  'PageError403',
  'LoginView',
  'RegisterView'
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routeConfigs
})

const handleRoutePermission = (to: RouteLocationNormalizedGeneric, _from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) => {
  const userStore = useUserStore()

  // 如果是默认首页
  if (to.path === '/') {
    const defaultHomeMenu = userStore.defaultHomeMenu
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
  if (VxeUI.permission.checkVisible(to.name as string)) {
    next()
    return
  }
  console.log('无权限访问', to)
  next({
    name: 'PageError403'
  })
}

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  NProgress.start()

  // 如果为白名单
  if (publicRouteList.includes(String(to.name))) {
    next()
    return
  }
  // 判断是否登录状态
  if (userStore.loginStatus) {
    handleRoutePermission(to, from, next)
    return
  }
  userStore.initServer().then(() => {
    handleRoutePermission(to, from, next)
  }).catch(() => {
    next({
      name: 'LoginView'
    })
  })
})

router.afterEach((to) => {
  const appStore = useAppStore()
  const userStore = useUserStore()
  // 更新页签
  if (userStore.loginStatus) {
    userStore.updateUserTabs({
      path: to.fullPath,
      routeName: to.name,
      name: routeToMenuName(to),
      query: to.query,
      params: to.params
    })
  }
  // 更新标题
  appStore.updatePageTitle(to)
  NProgress.done()
})

export default router
