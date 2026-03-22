import request from '@/utils/request'
import type { ApiResponse, PageResponse, PageParams } from '@/types/api'
import type {
  AttendanceRecord,
  AttendanceQueryForm,
  SupplementFormData,
  AttendanceStatistics,
  DeptAttendanceStatistics,
  EmployeeRanking
} from '@/types'

export function getAttendanceRecordList(
  params: AttendanceQueryForm & PageParams
): Promise<PageResponse<AttendanceRecord>> {
  return request.get('/attendance/record/list', { params })
}

export function getAttendanceDetail(id: string): Promise<AttendanceRecord> {
  return request.get(`/attendance/record/${id}`)
}

export function getAttendanceStatistics(): Promise<AttendanceStatistics> {
  return request.get('/attendance/statistics')
}

export function getDeptAttendanceStatistics(): Promise<DeptAttendanceStatistics[]> {
  return request.get('/attendance/statistics/dept')
}

export function getEmployeeRanking(): Promise<EmployeeRanking[]> {
  return request.get('/attendance/ranking')
}

export function getSupplementList(params: PageParams): Promise<PageResponse<any>> {
  return request.get('/attendance/supplement/list', { params })
}

export function createSupplement(data: SupplementFormData): Promise<ApiResponse> {
  return request.post('/attendance/supplement', data)
}

export function deleteSupplement(id: string): Promise<ApiResponse> {
  return request.delete(`/attendance/supplement/${id}`)
}

export function exportAttendance(params: AttendanceQueryForm): Promise<Blob> {
  return request.get('/attendance/export', { params, responseType: 'blob' })
}

export function markAbnormal(id: string, remark: string): Promise<ApiResponse> {
  return request.post(`/attendance/record/${id}/abnormal`, { remark })
}
