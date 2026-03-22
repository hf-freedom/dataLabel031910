export interface AttendanceQueryForm {
  employeeName: string
  department: string
  date: string
  status: string
}

export interface SupplementFormData {
  date: string
  type: 'check_in' | 'check_out'
  time: string
  reason: string
}

export interface AttendanceStatistics {
  totalEmployees: number
  normalRate: number
  lateCount: number
  absentCount: number
}

export interface DeptAttendanceStatistics {
  department: string
  total: number
  normal: number
  late: number
  earlyLeave: number
  absent: number
  leave: number
}

export interface EmployeeRanking {
  rank: number
  name: string
  department: string
  normalDays: number
  lateCount: number
  absentCount: number
}
