export const TASK_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const

export const TASK_STATUS_TEXT: Record<string, string> = {
  not_started: '未开始',
  in_progress: '进行中',
  completed: '已完成'
}

export const TASK_STATUS_TYPE: Record<string, string> = {
  not_started: 'info',
  in_progress: 'warning',
  completed: 'success'
}

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

export const TASK_PRIORITY_TEXT: Record<string, string> = {
  low: '低',
  medium: '中',
  high: '高'
}

export const TASK_PRIORITY_TYPE: Record<string, string> = {
  low: 'info',
  medium: 'warning',
  high: 'danger'
}
