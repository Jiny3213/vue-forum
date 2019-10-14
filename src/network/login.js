import {request} from './request.js'

function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  }).then(res => {
    var code = res.data.code
    if(code == 1) {
      alert('账号或密码错误，请重试') 
      return null
    }
    else if(code == 2) {
      alert('账号或密码错误，请重试')
      return null
    }  
    else if(code == -1) {
      alert('服务器繁忙，请稍后再试')
      return null
    }  
    else {
      alert('登录成功')
      localStorage.setItem('token', "Bearer " + res.data.token)
      console.log('登录成功，储存到本地的token是：' + localStorage.token)
      // 返回到绑定到vuex中的数据：用户名
      return (res.data.user)
    }
  })
}

// 每次加载页面，获取用户登录态
function getUser() {
  request({
    url: '/getuser',
  }).then(res => {
    if(res.data.msg == 'ok') {
      this.$store.state.user.username = res.data.user.username
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