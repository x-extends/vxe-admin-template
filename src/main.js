import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'

import { VxeUI, VxeButton } from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import { VxeTable, VxeGrid } from 'vxe-table'
import 'vxe-table/lib/style.css'

import './style/style.scss'
import './plugins'

import PageView from './views/layout/PageView.vue'

Vue.component('PageView', PageView)

Vue.use(VxeButton)
Vue.use(VxeTable)
Vue.use(VxeGrid)

Vue.config.productionTip = false

Vue.prototype.$permission = VxeUI.permission

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
