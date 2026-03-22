import request from '@/utils/request'
import type {
  ApprovalListParams,
  ApprovalListResponse,
  ApprovalDetailResponse,
  ApprovalCreateRequest,
  ApprovalActionRequest,
  ApprovalActionResponse
} from '@/types/api'

export const approvalApi = {
  getList: (params: ApprovalListParams, signal?: AbortSignal) =>
    request<ApprovalListResponse>({
      url: '/approval/list',
      method: 'get',
      params,
      signal
    }),

  getDetail: (id: string, signal?: AbortSignal) =>
    request<ApprovalDetailResponse>({
      url: `/approval/${id}`,
      method: 'get',
      signal
    }),

  create: (data: ApprovalCreateRequest, signal?: AbortSignal) =>
    request<ApprovalActionResponse>({
      url: '/approval',
      method: 'post',
      data,
      signal
    }),

  action: (data: ApprovalActionRequest, signal?: AbortSignal) =>
    request<ApprovalActionResponse>({
      url: `/approval/${data.id}/action`,
      method: 'post',
      data,
      signal
    }),

  withdraw: (id: string, signal?: AbortSignal) =>
    request<ApprovalActionResponse>({
      url: `/approval/${id}/withdraw`,
      method: 'post',
      signal
    })
}
