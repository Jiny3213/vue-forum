import {request} from './request.js'

class Login {
  constructor(username=null, password=null) {
    this.username = username
    this.password = password
  }
  start() {
    return request({
      url: '/login',
      method: 'post',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(res => {
      var code = res.data.code
      if(code == 1) {
        alert('登录失败，用户名错误') 
        return null
      }
      else if(code == 2) {
        alert('登录失败，密码错误')
        return null
      }  
      else if(code == -1) {
        alert('服务器繁忙，请稍后再试')
        return null
      }  
      else alert('登录成功')
      return (res.data.user)
    })
  }
  // 每次加载页面，获取用户登录态
  getUser() {
    request({
      url: '/getuser',
    }).then(res => {
      if(res.user) {
        console.log(res.user)
        this.$store.state.user.username = res.user.username
      }
      else {
        console.log('未登录')
      }
    })
  }
  
  
  // 测试是否获取到session
  test() {
    request({
      url: '/test'
    }).then(res => {
      console.log(res.data.code)
      console.log('测试成功')
    })
  }
}


export default Login