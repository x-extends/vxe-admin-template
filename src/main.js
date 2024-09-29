import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'

import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import './style/style.scss'
import './plugins'

import PageView from './views/layout/PageView.vue'

Vue.component('PageView', PageView)

Vue.use(VxeUI)
Vue.use(VxeTable)

Vue.config.productionTip = false

Vue.prototype.$permission = VxeUI.permission

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
