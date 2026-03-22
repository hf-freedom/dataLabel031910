export const MEETING_STATUS = {
  SCHEDULED: 'scheduled',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const

export const MEETING_STATUS_TEXT: Record<string, string> = {
  scheduled: '已预约',
  ongoing: '进行中',
  completed: '已完成',
  cancelled: '已取消'
}

export const MEETING_STATUS_TYPE: Record<string, string> = {
  scheduled: 'primary',
  ongoing: 'warning',
  completed: 'success',
  cancelled: 'info'
}
