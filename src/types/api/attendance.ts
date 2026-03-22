import type { ApiResponse, PaginationParams, PaginationResult } from './common'
import type { AttendanceRecord } from '../index'

export interface AttendanceListParams extends PaginationParams {
  employeeName?: string
  department?: string
  date?: string
  status?: string
}

export interface AttendanceListResponse extends ApiResponse<PaginationResult<AttendanceRecord>> {}

export interface AttendanceDetailResponse extends ApiResponse<AttendanceRecord> {}

export interface AttendanceSupplementRequest {
  date: string
  type: 'check_in' | 'check_out'
  time: string
  reason: string
  attachments?: string[]
}

export interface AttendanceStatisticsResponse extends ApiResponse<{
  totalEmployees: number
  normalRate: number
  lateCount: number
  absentCount: number
  deptStatistics: Array<{
    department: string
    total: number
    normal: number
    late: number
    earlyLeave: number
    absent: number
    leave: number
  }>
  employeeRanking: Array<{
    rank: number
    name: string
    department: string
    normalDays: number
    lateCount: number
    absentCount: number
  }>
}>
