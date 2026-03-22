import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const pendingMap = new Map<string, AbortController>()

const getPendingKey = (config: AxiosRequestConfig) => {
  return `${config.method}_${config.url}`
}

const addPending = (config: AxiosRequestConfig) => {
  const key = getPendingKey(config)
  if (!pendingMap.has(key)) {
    const controller = new AbortController()
    config.signal = controller.signal
    pendingMap.set(key, controller)
  }
}

const removePending = (config: AxiosRequestConfig) => {
  const key = getPendingKey(config)
  if (pendingMap.has(key)) {
    const controller = pendingMap.get(key)
    controller?.abort()
    pendingMap.delete(key)
  }
}

export const cancelAllPending = () => {
  pendingMap.forEach((controller) => {
    controller.abort()
  })
  pendingMap.clear()
}

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15000
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    removePending(config)
    addPending(config)

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
    removePending(response.config)
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
      removePending(error.config)
    }

    if (error.name === 'AbortError' || error.message === 'canceled') {
      console.log('请求已取消')
      return Promise.reject(error)
    }

    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default service
