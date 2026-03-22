import request from '@/utils/request'
import type { AttendanceRecord, PageParams, PageResult } from '@/types'

export const attendanceApi = {
  getRecords: (params: PageParams & { employeeName?: string; department?: string; date?: string; startDate?: string; endDate?: string }) => {
    return request<PageResult<AttendanceRecord>>({
      url: '/attendance/records',
      method: 'get',
      params
    })
  },

  getMyRecords: (params: PageParams & { startDate?: string; endDate?: string }) => {
    return request<PageResult<AttendanceRecord>>({
      url: '/attendance/my',
      method: 'get',
      params
    })
  },

  getStatistics: (params: { department?: string; startDate?: string; endDate?: string }) => {
    return request<{
      total: number
      normal: number
      late: number
      earlyLeave: number
      absent: number
      leave: number
      abnormalRate: string
    }>({
      url: '/attendance/statistics',
      method: 'get',
      params
    })
  },

  getDepartmentStatistics: (params: { startDate?: string; endDate?: string }) => {
    return request<Array<{
      department: string
      total: number
      normal: number
      rate: string
    }>>({
      url: '/attendance/departmentStatistics',
      method: 'get',
      params
    })
  },

  checkIn: () => {
    return request({
      url: '/attendance/checkIn',
      method: 'post'
    })
  },

  checkOut: () => {
    return request({
      url: '/attendance/checkOut',
      method: 'post'
    })
  }
}
