import request from '@/utils/request'
import type { ApiResponse, PageResponse, PageParams } from '@/types/api'
import type { Approval, ApprovalFormData, ApproveFormData } from '@/types'

export function getPendingList(params: PageParams): Promise<PageResponse<Approval>> {
  return request.get('/approval/pending', { params })
}

export function getApprovedList(params: PageParams): Promise<PageResponse<Approval>> {
  return request.get('/approval/approved', { params })
}

export function getMyApprovalList(params: PageParams): Promise<PageResponse<Approval>> {
  return request.get('/approval/my', { params })
}

export function getApprovalDetail(id: string): Promise<Approval> {
  return request.get(`/approval/${id}`)
}

export function createApproval(data: ApprovalFormData): Promise<ApiResponse> {
  return request.post('/approval', data)
}

export function approveApproval(id: string, data: ApproveFormData): Promise<ApiResponse> {
  return request.post(`/approval/${id}/approve`, data)
}

export function withdrawApproval(id: string): Promise<ApiResponse> {
  return request.post(`/approval/${id}/withdraw`)
}
