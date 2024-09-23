import { RouteRecordRaw } from 'vue-router'

import RouteLayout from '@/views/layout/RouteLayout.vue'
import UserLayout from '@/views/layout/UserLayout.vue'
import LoginLayout from '@/views/layout/LoginLayout.vue'

export const routeConfigs: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LoginLayout
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: 'login',
        name: 'LoginView',
        component: () => import('../views/login/LoginView.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: 'register',
        name: 'RegisterView',
        component: () => import('../views/login/RegisterView.vue'),
        meta: {
          title: '注册'
        }
      }
    ]
  },
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: 'home',
        name: 'HomeList',
        component: () => import('../views/home/HomeList.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'aboutUs',
        name: 'AboutUs',
        component: () => import('../views/about/AboutUs.vue'),
        meta: {
          title: '关于我们'
        }
      },
      {
        path: 'demoOne',
        component: RouteLayout,
        children: [
          {
            path: 'demoOneList',
            name: 'DemoOneList',
            component: () => import('../views/demoOne/DemoOneList.vue'),
            meta: {
              title: '示例一列表'
            }
          },
          {
            path: 'demoOneDetails',
            name: 'DemoOneDetails',
            component: () => import('../views/demoOne/DemoOneDetails.vue'),
            meta: {
              title: '示例一详情'
            }
          }
        ]
      },
      {
        path: 'demoTwo',
        component: RouteLayout,
        children: [
          {
            path: 'demoTwoList',
            name: 'DemoTwoList',
            component: () => import('../views/demoTwo/DemoTwoList.vue'),
            meta: {
              title: '示例二列表'
            }
          },
          {
            path: 'demoTwoDetails',
            name: 'DemoTwoDetails',
            component: () => import('../views/demoTwo/DemoTwoDetails.vue'),
            meta: {
              title: '示例二详情'
            }
          },
          {
            path: 'demoTwoAdd',
            name: 'DemoTwoAdd',
            component: () => import('../views/demoTwo/DemoTwoEdit.vue'),
            meta: {
              title: '示例二新增'
            }
          },
          {
            path: 'demoTwoEdit',
            name: 'DemoTwoEdit',
            component: () => import('../views/demoTwo/DemoTwoEdit.vue'),
            meta: {
              title: '示例二编辑'
            }
          }
        ]
      },
      {
        path: 'demoThree',
        component: RouteLayout,
        children: [
          {
            path: 'demoThreeList',
            name: 'DemoThreeList',
            component: () => import('../views/demoThree/DemoThreeList.vue'),
            meta: {
              title: '示例三列表'
            }
          }
        ]
      },
      {
        path: 'demoFour',
        component: RouteLayout,
        children: [
          {
            path: 'demoFourList',
            name: 'DemoFourList',
            component: () => import('../views/demoFour/DemoFourList.vue'),
            meta: {
              title: '示例四列表'
            }
          }
        ]
      },
      {
        path: 'systemManage',
        component: RouteLayout,
        children: [
          {
            path: 'userManage',
            name: 'UserManageList',
            component: () => import('../views/systemManage/userManage/UserManageList.vue'),
            meta: {
              title: '用户管理'
            }
          },
          {
            path: 'roleManageList',
            name: 'RoleManageList',
            component: () => import('../views/systemManage/roleManage/RoleManageList.vue'),
            meta: {
              title: '角色管理'
            }
          },
          {
            path: 'permissionsManageList',
            name: 'PermissionsManageList',
            component: () => import('../views/systemManage/permissionsManage/PermissionsManageList.vue'),
            meta: {
              title: '权限管理'
            }
          },
          {
            path: 'routeManageList',
            name: 'RouteManageList',
            component: () => import('../views/systemManage/routeManage/RouteManageList.vue'),
            meta: {
              title: '路由管理'
            }
          },
          {
            path: 'dictManageList',
            name: 'DictManageList',
            component: () => import('../views/systemManage/dictManage/DictManageList.vue'),
            meta: {
              title: '数据字典'
            }
          },
          {
            path: 'dictDataList',
            name: 'DictDataList',
            component: () => import('../views/systemManage/dictManage/DictDataList.vue'),
            meta: {
              title: '数据配置'
            }
          },
          {
            path: 'logManageList',
            name: 'LogManageList',
            component: () => import('../views/systemManage/logManage/LogManageList.vue'),
            meta: {
              title: '系统日志'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/404',
    name: 'PageError404',
    component: () => import('../views/error/PageError404.vue'),
    meta: {
      title: '404 找不到页面'
    }
  },
  {
    path: '/403',
    name: 'PageError403',
    component: () => import('../views/error/PageError403.vue'),
    meta: {
      title: '403 无权限访问'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'PageError404'
    }
  }
]
