// Vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 用于保存状态,在组件dom中使用：$store.state.counter
    counter: 1000,
    user: {
      username: null,
      avatar: null
    }
  },
  mutations: {
    // 登录后设定数据
    setUser(state, user) {
      state.user.username = user.username
      state.user.avatar = user.avatar
    },
    // 退出登录删除数据
    logout(state) {
      state.user.username = null
      state.user.avatar = null
    }
  },
  getters: {
    // 相当于计算属性,如果return一个函数则可以传参
	powerCounter(state) {
		return state.counter * state.counter
	}
  },
  actions: {
	  // mutation的异步操作，使用：this.store.dispatch('aIncrement')
	  aIncrement(context) {
		  setTimeout(() => {
			  context.commit('increment')
		  }, 1000)
	  }
  }
  
})

export default store