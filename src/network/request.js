import axios from 'axios'

// const baseURL = 'http://101.132.237.93'
const baseURL = 'http://localhost:8888'

export {baseURL}
export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    // 带上cookies
    withCredentials: true
  })
  // 请求拦截,在headers上加上token
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = token
      }
    return config
  }, err => {
    console.log(err)
    console.log('请求失败')
  })
  
  // 响应拦截
  instance.interceptors.response.use(res => {
    if(res.data.msg) {
      if(res.data.msg === 'login') {
        alert('请登录再试')
        location.reload()
      }
    }
    // 必须返回
    return res
  }, err => {
    console.log(err)
    console.log('响应失败')
  })
  
  // 发送网络请求,返回一个promise
  return instance(config)
}