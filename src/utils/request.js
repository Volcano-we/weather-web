import axios from 'axios'
import storage from 'store'
import message from 'ant-design-vue/es/message'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    let errMsg = '请求超时'
    if (error.response.status === 404) {
      errMsg = '请求失败'
    } else if (error.response.status === 500) {
      errMsg = '请求出错'
    }
    message.error(errMsg)
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  // 如果 token 存在，让每个请求携带自定义 token
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  // 从 localstorage 获取 token
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
