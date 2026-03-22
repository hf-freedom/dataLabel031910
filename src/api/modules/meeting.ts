import request from '@/utils/request'
import type {
  MeetingListParams,
  MeetingListResponse,
  MeetingDetailResponse,
  MeetingCreateRequest,
  MeetingUpdateRequest,
  MeetingMinutesRequest,
  MeetingCancelResponse
} from '@/types/api'

export const meetingApi = {
  getList: (params: MeetingListParams, signal?: AbortSignal) =>
    request<MeetingListResponse>({
      url: '/meeting/list',
      method: 'get',
      params,
      signal
    }),

  getDetail: (id: string, signal?: AbortSignal) =>
    request<MeetingDetailResponse>({
      url: `/meeting/${id}`,
      method: 'get',
      signal
    }),

  create: (data: MeetingCreateRequest, signal?: AbortSignal) =>
    request<MeetingDetailResponse>({
      url: '/meeting',
      method: 'post',
      data,
      signal
    }),

  update: (data: MeetingUpdateRequest, signal?: AbortSignal) =>
    request<MeetingDetailResponse>({
      url: `/meeting/${data.id}`,
      method: 'put',
      data,
      signal
    }),

  cancel: (id: string, signal?: AbortSignal) =>
    request<MeetingCancelResponse>({
      url: `/meeting/${id}/cancel`,
      method: 'post',
      signal
    }),

  saveMinutes: (data: MeetingMinutesRequest, signal?: AbortSignal) =>
    request({
      url: `/meeting/${data.id}/minutes`,
      method: 'post',
      data,
      signal
    })
}
