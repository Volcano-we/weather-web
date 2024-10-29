import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

// default main router control
// 默认路由模式为静态路由 (router.config.js)
import router from './modules/router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    router
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
