import {request} from './request.js'

// 用户输入昵称时，测试是否重名
function testUsername(username) {
  return request({
    url: '/testusername',
    params: {
      username: username
    }
  })
}

// 注册，保存token
function register(email, username, password) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      email,
      username,
      password
    }
  }).then(res => {
    if(res.data.msg == 'ok') {
      localStorage.setItem('token', "Bearer " + res.data.token)
      // 返回用户数据，保存到vuex中
      return res.data.user
    }
    else {
      // 服务端验证失败
      return null
    }
  })
}

export default {
  testUsername,
  register
}