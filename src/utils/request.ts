import axios from 'axios'
import type { AxiosResponse } from 'axios'
import router from '../config/router'

axios.defaults.baseURL = import.meta.env.VITE_BaseUrl

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      // 判断token是否存在
      config.headers.Authorization = 'Bearer ' + token // 将token设置成请求头
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (config) => {
    // 身份认证失败，跳转登录
    if (config.data.status == 4003) {
      // 清除已过期的 token
      try {
        localStorage.removeItem('token')
      } catch {}
      router.push('/login')
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export type Response<T = any> = Promise<AxiosResponse<{ status: number; data: T }>>

export default axios
