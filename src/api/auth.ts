import request from '@/utils/request'
import type { ApiResponse } from '@/types/api'
import type { UserInfo } from '@/stores/user'

export function login(username: string, password: string): Promise<{ token: string; user: UserInfo }> {
  return request.post('/auth/login', { username, password })
}

export function logout(): Promise<ApiResponse> {
  return request.post('/auth/logout')
}

export function getUserInfo(): Promise<UserInfo> {
  return request.get('/auth/user-info')
}

export function refreshToken(): Promise<{ token: string }> {
  return request.post('/auth/refresh-token')
}

export function changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse> {
  return request.post('/auth/change-password', { oldPassword, newPassword })
}
