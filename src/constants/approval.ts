export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  TRANSFERRED: 'transferred'
} as const

export const APPROVAL_STATUS_TEXT: Record<string, string> = {
  pending: '待审批',
  approved: '已通过',
  rejected: '已驳回',
  transferred: '已转交'
}

export const APPROVAL_STATUS_COLOR: Record<string, string> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  transferred: 'info'
}

export const APPROVAL_TYPE = {
  LEAVE: 'leave',
  EXPENSE: 'expense',
  SEAL: 'seal'
} as const

export const APPROVAL_TYPE_TEXT: Record<string, string> = {
  leave: '请假',
  expense: '报销',
  seal: '用印'
}

export const APPROVAL_TYPE_COLOR: Record<string, string> = {
  leave: 'primary',
  expense: 'success',
  seal: 'warning'
}
