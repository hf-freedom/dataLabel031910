import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

interface RequestConfig extends AxiosRequestConfig {
  signal?: AbortSignal
}

const pendingRequests = new Map<string, AbortController>()

function generateRequestKey(config: InternalAxiosRequestConfig): string {
  const { method, url } = config
  return `${method}-${url}`
}

function addPendingRequest(config: InternalAxiosRequestConfig): void {
  const key = generateRequestKey(config)
  if (pendingRequests.has(key)) {
    const controller = pendingRequests.get(key)
    controller?.abort()
  }
  const controller = new AbortController()
  config.signal = controller.signal
  pendingRequests.set(key, controller)
}

function removePendingRequest(config: InternalAxiosRequestConfig): void {
  const key = generateRequestKey(config)
  if (pendingRequests.has(key)) {
    pendingRequests.delete(key)
  }
}

export function cancelAllRequests(): void {
  pendingRequests.forEach((controller) => {
    controller.abort()
  })
  pendingRequests.clear()
}

export function cancelRequestByUrl(url: string): void {
  pendingRequests.forEach((controller, key) => {
    if (key.includes(url)) {
      controller.abort()
      pendingRequests.delete(key)
    }
  })
}

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15000
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    addPendingRequest(config)
    
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    removePendingRequest(response.config)
    
    const { code, message, data } = response.data
    if (code === 200) {
      return data
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message || '请求失败'))
    }
  },
  (error) => {
    if (error.config) {
      removePendingRequest(error.config)
    }
    
    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
      console.log('Request canceled:', error.config?.url)
      return Promise.reject(error)
    }
    
    if (error.response) {
      const { status } = error.response
      switch (status) {
        case 401:
          ElMessage.error('登录已过期，请重新登录')
          const userStore = useUserStore()
          userStore.logout()
          break
        case 403:
          ElMessage.error('没有权限访问')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器错误')
          break
        default:
          ElMessage.error(error.message || '网络错误')
      }
    } else {
      ElMessage.error(error.message || '网络错误')
    }
    return Promise.reject(error)
  }
)

export interface RequestOptions {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch'
  data?: any
  params?: any
  headers?: Record<string, string>
  signal?: AbortSignal
}

export function request<T = any>(options: RequestOptions): Promise<T> {
  const { url, method = 'get', data, params, headers, signal } = options
  
  const config: RequestConfig = {
    url,
    method,
    data,
    params,
    headers,
    signal
  }
  
  if (method === 'get' || method === 'delete') {
    config.params = data || params
  }
  
  return service.request<any, T>(config)
}

export default service
