import type { ApiResponse, PaginationParams, PaginationResult } from './common'
import type { Approval } from '../index'

export interface ApprovalListParams extends PaginationParams {
  type?: string
  status?: string
  tab: 'pending' | 'approved' | 'my'
}

export interface ApprovalListResponse extends ApiResponse<PaginationResult<Approval>> {}

export interface ApprovalDetailResponse extends ApiResponse<Approval> {}

export interface ApprovalCreateRequest {
  type: 'leave' | 'expense' | 'seal'
  title: string
  approvers: string[]
  formData: any
  attachments?: string[]
}

export interface ApprovalActionRequest {
  id: string
  action: 'approve' | 'reject' | 'transfer'
  opinion?: string
  transferTo?: string
}

export interface ApprovalActionResponse extends ApiResponse<Approval> {}
