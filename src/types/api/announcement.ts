import type { ApiResponse, PaginationParams, PaginationResult } from './common'
import type { Announcement } from '../index'

export interface AnnouncementListParams extends PaginationParams {
  title?: string
  department?: string
  status?: string
}

export interface AnnouncementListResponse extends ApiResponse<PaginationResult<Announcement>> {}

export interface AnnouncementDetailResponse extends ApiResponse<Announcement> {}

export interface AnnouncementCreateRequest {
  title: string
  content: string
  scope: 'all' | 'department' | 'specific'
  scopeData?: string[]
  effectiveTime: string
  expireTime: string
  attachments?: string[]
}

export interface AnnouncementUpdateRequest extends Partial<AnnouncementCreateRequest> {
  id: string
}

export interface AnnouncementPublishResponse extends ApiResponse<Announcement> {}
