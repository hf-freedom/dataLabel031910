import type { ApiResponse, PaginationParams, PaginationResult } from './common'
import type { Meeting } from '../index'

export interface MeetingListParams extends PaginationParams {
  title?: string
  status?: string
  dateRange?: string[]
}

export interface MeetingListResponse extends ApiResponse<PaginationResult<Meeting>> {}

export interface MeetingDetailResponse extends ApiResponse<Meeting> {}

export interface MeetingCreateRequest {
  title: string
  time: string
  location: string
  roomId: string
  attendees: string[]
  equipment?: string[]
  description?: string
  materials?: string[]
}

export interface MeetingUpdateRequest extends Partial<MeetingCreateRequest> {
  id: string
}

export interface MeetingMinutesRequest {
  id: string
  minutes: string
  todos?: string
}

export interface MeetingCancelResponse extends ApiResponse<Meeting> {}
