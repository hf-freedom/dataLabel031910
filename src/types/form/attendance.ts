export interface AttendanceQueryForm {
  employeeName: string
  department: string
  date: string
  status: string
}

export interface AttendanceSupplementForm {
  date: string
  type: 'check_in' | 'check_out'
  time: string
  reason: string
}
