import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 5000
  })
  // 请求拦截器
  instance.interceptors.request.use(config => {
    // console.log('请求成功')
    // console.log(config)
    // 必须返回
    return config
  }, err => {
    console.log('请求失败')
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log('响应成功')
    // 必须返回
    return res
  }, err => {
    console.log('响应失败')
  })
  
  // 发送网络请求,返回一个promise
  return instance(config)
}