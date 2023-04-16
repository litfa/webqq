import axios from 'axios'
import type { AxiosResponse } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BaseUrl

export type Response<T = any> = Promise<AxiosResponse<{ status: number; data: T }>>

export default axios
