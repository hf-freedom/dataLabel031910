import request from '@/utils/request'
import type {
  AttendanceListParams,
  AttendanceListResponse,
  AttendanceDetailResponse,
  AttendanceSupplementRequest,
  AttendanceStatisticsResponse
} from '@/types/api'

export const attendanceApi = {
  getList: (params: AttendanceListParams, signal?: AbortSignal) =>
    request<AttendanceListResponse>({
      url: '/attendance/list',
      method: 'get',
      params,
      signal
    }),

  getDetail: (id: string, signal?: AbortSignal) =>
    request<AttendanceDetailResponse>({
      url: `/attendance/${id}`,
      method: 'get',
      signal
    }),

  createSupplement: (data: AttendanceSupplementRequest, signal?: AbortSignal) =>
    request({
      url: '/attendance/supplement',
      method: 'post',
      data,
      signal
    }),

  deleteSupplement: (id: string, signal?: AbortSignal) =>
    request({
      url: `/attendance/supplement/${id}`,
      method: 'delete',
      signal
    }),

  markAbnormal: (id: string, signal?: AbortSignal) =>
    request({
      url: `/attendance/${id}/abnormal`,
      method: 'post',
      signal
    }),

  getStatistics: (signal?: AbortSignal) =>
    request<AttendanceStatisticsResponse>({
      url: '/attendance/statistics',
      method: 'get',
      signal
    }),

  export: (params: { date?: string; department?: string }, signal?: AbortSignal) =>
    request({
      url: '/attendance/export',
      method: 'get',
      params,
      responseType: 'blob',
      signal
    })
}
