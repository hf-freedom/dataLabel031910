import request from '@/utils/request'
import type { LoginForm, LoginResponse, UserInfo } from '@/types'

export const userApi = {
  login: (data: LoginForm) => {
    return request<LoginResponse>({
      url: '/user/login',
      method: 'post',
      data
    })
  },

  logout: () => {
    return request({
      url: '/user/logout',
      method: 'post'
    })
  },

  getUserInfo: () => {
    return request<UserInfo>({
      url: '/user/info',
      method: 'get'
    })
  },

  updateProfile: (data: Partial<UserInfo>) => {
    return request({
      url: '/user/profile',
      method: 'put',
      data
    })
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return request({
      url: '/user/password',
      method: 'put',
      data
    })
  }
}
