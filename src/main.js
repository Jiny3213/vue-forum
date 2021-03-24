// 引入vue
import Vue from 'vue'


// 引入vue路由
import router from './router/index.js'
// 引入vuex
import store from './store'
Vue.prototype.$store = store

// 引入api
import axios from './network'
Vue.prototype.$axios = axios

import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
