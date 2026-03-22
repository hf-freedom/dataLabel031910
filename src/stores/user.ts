import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '@/types'
import { userApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)
  const loading = ref(false)

  const isLogin = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  const fetchUserInfo = async () => {
    if (!token.value) return
    loading.value = true
    try {
      const info = await userApi.getUserInfo()
      userInfo.value = info
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    token,
    userInfo,
    loading,
    isLogin,
    setToken,
    setUserInfo,
    logout,
    fetchUserInfo
  }
})