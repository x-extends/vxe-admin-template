import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  }
})

export default store
