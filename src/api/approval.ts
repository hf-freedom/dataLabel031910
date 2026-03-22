import request from '@/utils/request'
import type { Approval, ApprovalForm, PageParams, PageResult } from '@/types'

export const approvalApi = {
  getPendingList: (params: PageParams) => {
    return request<PageResult<Approval>>({
      url: '/approval/pending',
      method: 'get',
      params
    })
  },

  getApprovedList: (params: PageParams) => {
    return request<PageResult<Approval>>({
      url: '/approval/approved',
      method: 'get',
      params
    })
  },

  getMyList: (params: PageParams) => {
    return request<PageResult<Approval>>({
      url: '/approval/my',
      method: 'get',
      params
    })
  },

  getDetail: (id: string) => {
    return request<Approval>({
      url: `/approval/detail`,
      method: 'get',
      params: { id }
    })
  },

  create: (data: ApprovalForm) => {
    return request({
      url: '/approval/create',
      method: 'post',
      data
    })
  },

  approve: (data: { id: string; action: 'approve' | 'reject' | 'transfer'; opinion?: string; transferTo?: string }) => {
    return request({
      url: '/approval/approve',
      method: 'post',
      data
    })
  },

  withdraw: (id: string) => {
    return request({
      url: `/approval/withdraw`,
      method: 'post',
      data: { id }
    })
  }
}
