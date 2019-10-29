import {request} from './request.js'

function login(email, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

// 每次加载页面，获取用户登录态
function getUser() {
  request({
    url: '/getuser',
  }).then(res => {
    if(res.data.msg == 'ok') {
      // 把服务端读出来的token数据保存到vuex
      this.$store.commit('setUser', res.data.user)
    }
    else {
      console.log('未登录')
    }
  })
}
  

export {
  login,
  getUser,
}