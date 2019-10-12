// 引入vue
import Vue from 'vue'

// 引入element-ui
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 引入vue路由
import router from './router/index.js'

// 引入vuex
import store from './store'
Vue.prototype.$store = store



import App from './App.vue'

// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
