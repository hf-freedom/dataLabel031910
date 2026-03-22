export const ATTENDANCE_STATUS = {
  NORMAL: 'normal',
  LATE: 'late',
  EARLY_LEAVE: 'early_leave',
  ABSENT: 'absent',
  LEAVE: 'leave'
} as const

export const ATTENDANCE_STATUS_TEXT: Record<string, string> = {
  normal: '正常',
  late: '迟到',
  early_leave: '早退',
  absent: '旷工',
  leave: '请假'
}

export const ATTENDANCE_STATUS_TYPE: Record<string, string> = {
  normal: 'success',
  late: 'warning',
  early_leave: 'warning',
  absent: 'danger',
  leave: 'info'
}

export const SUPPLEMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const

export const SUPPLEMENT_STATUS_TEXT: Record<string, string> = {
  pending: '待审批',
  approved: '已通过',
  rejected: '已拒绝'
}

export const SUPPLEMENT_STATUS_TYPE: Record<string, string> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger'
}
