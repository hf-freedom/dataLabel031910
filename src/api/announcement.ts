import request from '@/utils/request'
import type { ApiResponse, PageResponse, PageParams } from '@/types/api'
import type { Announcement, AnnouncementQueryForm, AnnouncementFormData } from '@/types'

export function getAnnouncementList(
  params: AnnouncementQueryForm & PageParams
): Promise<PageResponse<Announcement>> {
  return request.get('/announcement/list', { params })
}

export function getAnnouncementDetail(id: string): Promise<Announcement> {
  return request.get(`/announcement/${id}`)
}

export function createAnnouncement(data: AnnouncementFormData): Promise<ApiResponse> {
  return request.post('/announcement', data)
}

export function updateAnnouncement(id: string, data: AnnouncementFormData): Promise<ApiResponse> {
  return request.put(`/announcement/${id}`, data)
}

export function deleteAnnouncement(id: string): Promise<ApiResponse> {
  return request.delete(`/announcement/${id}`)
}

export function publishAnnouncement(id: string): Promise<ApiResponse> {
  return request.post(`/announcement/${id}/publish`)
}

export function recallAnnouncement(id: string): Promise<ApiResponse> {
  return request.post(`/announcement/${id}/recall`)
}

export function markAnnouncementRead(id: string): Promise<ApiResponse> {
  return request.post(`/announcement/${id}/read`)
}
