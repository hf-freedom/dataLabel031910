import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const pendingRequests = new Map<string, AbortController>()

export const getRequestKey = (config: AxiosRequestConfig) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

export const addPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = getRequestKey(config)
  if (!pendingRequests.has(requestKey)) {
    const controller = new AbortController()
    config.signal = controller.signal
    pendingRequests.set(requestKey, controller)
  } else {
    const controller = pendingRequests.get(requestKey)!
    config.signal = controller.signal
  }
}

export const removePendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = getRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}

export const cancelPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = getRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    const controller = pendingRequests.get(requestKey)!
    controller.abort()
    pendingRequests.delete(requestKey)
  }
}

export const cancelAllPendingRequests = () => {
  pendingRequests.forEach((controller) => {
    controller.abort()
  })
  pendingRequests.clear()
}

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15000
})

service.interceptors.request.use(
  (config) => {
    cancelPendingRequest(config)
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
    if (error.code !== 'ERR_CANCELED') {
      ElMessage.error(error.message || '网络错误')
    }
    if (error.config) {
      removePendingRequest(error.config)
    }
    return Promise.reject(error)
  }
)

export default service