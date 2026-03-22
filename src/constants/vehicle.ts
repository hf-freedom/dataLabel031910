export const VEHICLE_STATUS = {
  IDLE: 'idle',
  IN_USE: 'in_use',
  MAINTENANCE: 'maintenance'
} as const

export const VEHICLE_STATUS_TEXT: Record<string, string> = {
  idle: '空闲',
  in_use: '使用中',
  maintenance: '维修中'
}

export const VEHICLE_STATUS_TYPE: Record<string, string> = {
  idle: 'success',
  in_use: 'warning',
  maintenance: 'danger'
}

export const VEHICLE_APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_USE: 'in_use',
  COMPLETED: 'completed'
} as const

export const VEHICLE_APPLICATION_STATUS_TEXT: Record<string, string> = {
  pending: '待审批',
  approved: '已批准',
  rejected: '已拒绝',
  in_use: '使用中',
  completed: '已完成'
}

export const VEHICLE_APPLICATION_STATUS_TYPE: Record<string, string> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  in_use: 'primary',
  completed: 'info'
}
