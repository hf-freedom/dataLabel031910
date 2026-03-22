import request from '@/utils/request'
import type { ApiResponse, PageResponse, PageParams } from '@/types/api'
import type { Meeting, MeetingQueryForm, MeetingFormData, MinutesFormData } from '@/types'

export function getMeetingList(
  params: MeetingQueryForm & PageParams
): Promise<PageResponse<Meeting>> {
  return request.get('/meeting/list', { params })
}

export function getMeetingDetail(id: string): Promise<Meeting> {
  return request.get(`/meeting/${id}`)
}

export function createMeeting(data: MeetingFormData): Promise<ApiResponse> {
  return request.post('/meeting', data)
}

export function updateMeeting(id: string, data: MeetingFormData): Promise<ApiResponse> {
  return request.put(`/meeting/${id}`, data)
}

export function cancelMeeting(id: string): Promise<ApiResponse> {
  return request.post(`/meeting/${id}/cancel`)
}

export function saveMinutes(id: string, data: MinutesFormData): Promise<ApiResponse> {
  return request.post(`/meeting/${id}/minutes`, data)
}

export function checkRoomAvailability(
  roomId: string,
  time: string
): Promise<{ available: boolean }> {
  return request.get('/meeting/room/availability', { params: { roomId, time } })
}
