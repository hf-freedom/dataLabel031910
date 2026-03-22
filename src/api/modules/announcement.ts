import request from '@/utils/request'
import type {
  AnnouncementListParams,
  AnnouncementListResponse,
  AnnouncementDetailResponse,
  AnnouncementCreateRequest,
  AnnouncementUpdateRequest,
  AnnouncementPublishResponse
} from '@/types/api'

export const announcementApi = {
  getList: (params: AnnouncementListParams, signal?: AbortSignal) =>
    request<AnnouncementListResponse>({
      url: '/announcement/list',
      method: 'get',
      params,
      signal
    }),

  getDetail: (id: string, signal?: AbortSignal) =>
    request<AnnouncementDetailResponse>({
      url: `/announcement/${id}`,
      method: 'get',
      signal
    }),

  create: (data: AnnouncementCreateRequest, signal?: AbortSignal) =>
    request<AnnouncementPublishResponse>({
      url: '/announcement',
      method: 'post',
      data,
      signal
    }),

  update: (data: AnnouncementUpdateRequest, signal?: AbortSignal) =>
    request<AnnouncementPublishResponse>({
      url: `/announcement/${data.id}`,
      method: 'put',
      data,
      signal
    }),

  delete: (id: string, signal?: AbortSignal) =>
    request({
      url: `/announcement/${id}`,
      method: 'delete',
      signal
    }),

  recall: (id: string, signal?: AbortSignal) =>
    request<AnnouncementPublishResponse>({
      url: `/announcement/${id}/recall`,
      method: 'post',
      signal
    }),

  markRead: (id: string, signal?: AbortSignal) =>
    request({
      url: `/announcement/${id}/read`,
      method: 'post',
      signal
    })
}
