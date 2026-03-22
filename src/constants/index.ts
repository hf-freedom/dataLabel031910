export const ANNOUNCEMENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  EXPIRED: 'expired'
} as const

export const ANNOUNCEMENT_STATUS_TEXT = {
  [ANNOUNCEMENT_STATUS.DRAFT]: '草稿',
  [ANNOUNCEMENT_STATUS.PUBLISHED]: '已发布',
  [ANNOUNCEMENT_STATUS.EXPIRED]: '已过期'
} as const

export const ANNOUNCEMENT_STATUS_TYPE = {
  [ANNOUNCEMENT_STATUS.DRAFT]: 'info',
  [ANNOUNCEMENT_STATUS.PUBLISHED]: 'success',
  [ANNOUNCEMENT_STATUS.EXPIRED]: 'danger'
} as const

export const ANNOUNCEMENT_SCOPE = {
  ALL: 'all',
  DEPARTMENT: 'department',
  SPECIFIC: 'specific'
} as const

export const ANNOUNCEMENT_SCOPE_TEXT = {
  [ANNOUNCEMENT_SCOPE.ALL]: '全员',
  [ANNOUNCEMENT_SCOPE.DEPARTMENT]: '部门',
  [ANNOUNCEMENT_SCOPE.SPECIFIC]: '指定人员'
} as const

export const APPROVAL_TYPE = {
  LEAVE: 'leave',
  EXPENSE: 'expense',
  SEAL: 'seal'
} as const

export const APPROVAL_TYPE_TEXT = {
  [APPROVAL_TYPE.LEAVE]: '请假',
  [APPROVAL_TYPE.EXPENSE]: '报销',
  [APPROVAL_TYPE.SEAL]: '用印'
} as const

export const APPROVAL_TYPE_COLOR = {
  [APPROVAL_TYPE.LEAVE]: 'primary',
  [APPROVAL_TYPE.EXPENSE]: 'success',
  [APPROVAL_TYPE.SEAL]: 'warning'
} as const

export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  TRANSFERRED: 'transferred'
} as const

export const APPROVAL_STATUS_TEXT = {
  [APPROVAL_STATUS.PENDING]: '待审批',
  [APPROVAL_STATUS.APPROVED]: '已通过',
  [APPROVAL_STATUS.REJECTED]: '已驳回',
  [APPROVAL_STATUS.TRANSFERRED]: '已转交'
} as const

export const APPROVAL_STATUS_COLOR = {
  [APPROVAL_STATUS.PENDING]: 'warning',
  [APPROVAL_STATUS.APPROVED]: 'success',
  [APPROVAL_STATUS.REJECTED]: 'danger',
  [APPROVAL_STATUS.TRANSFERRED]: 'info'
} as const

export const VEHICLE_STATUS = {
  IDLE: 'idle',
  IN_USE: 'in_use',
  MAINTENANCE: 'maintenance'
} as const

export const VEHICLE_STATUS_TEXT = {
  [VEHICLE_STATUS.IDLE]: '空闲',
  [VEHICLE_STATUS.IN_USE]: '使用中',
  [VEHICLE_STATUS.MAINTENANCE]: '维修中'
} as const

export const VEHICLE_STATUS_TYPE = {
  [VEHICLE_STATUS.IDLE]: 'success',
  [VEHICLE_STATUS.IN_USE]: 'warning',
  [VEHICLE_STATUS.MAINTENANCE]: 'danger'
} as const

export const VEHICLE_APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_USE: 'in_use',
  COMPLETED: 'completed'
} as const

export const VEHICLE_APPLICATION_STATUS_TEXT = {
  [VEHICLE_APPLICATION_STATUS.PENDING]: '待审批',
  [VEHICLE_APPLICATION_STATUS.APPROVED]: '已批准',
  [VEHICLE_APPLICATION_STATUS.REJECTED]: '已拒绝',
  [VEHICLE_APPLICATION_STATUS.IN_USE]: '使用中',
  [VEHICLE_APPLICATION_STATUS.COMPLETED]: '已完成'
} as const

export const VEHICLE_APPLICATION_STATUS_TYPE = {
  [VEHICLE_APPLICATION_STATUS.PENDING]: 'warning',
  [VEHICLE_APPLICATION_STATUS.APPROVED]: 'success',
  [VEHICLE_APPLICATION_STATUS.REJECTED]: 'danger',
  [VEHICLE_APPLICATION_STATUS.IN_USE]: 'primary',
  [VEHICLE_APPLICATION_STATUS.COMPLETED]: 'info'
} as const

export const MEETING_STATUS = {
  SCHEDULED: 'scheduled',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const

export const MEETING_STATUS_TEXT = {
  [MEETING_STATUS.SCHEDULED]: '已预约',
  [MEETING_STATUS.ONGOING]: '进行中',
  [MEETING_STATUS.COMPLETED]: '已完成',
  [MEETING_STATUS.CANCELLED]: '已取消'
} as const

export const MEETING_STATUS_TYPE = {
  [MEETING_STATUS.SCHEDULED]: 'warning',
  [MEETING_STATUS.ONGOING]: 'primary',
  [MEETING_STATUS.COMPLETED]: 'success',
  [MEETING_STATUS.CANCELLED]: 'danger'
} as const

export const DOCUMENT_TYPE = {
  SYSTEM: 'system',
  PROCESS: 'process',
  MATERIAL: 'material'
} as const

export const DOCUMENT_TYPE_TEXT = {
  [DOCUMENT_TYPE.SYSTEM]: '制度文件',
  [DOCUMENT_TYPE.PROCESS]: '流程文件',
  [DOCUMENT_TYPE.MATERIAL]: '资料文件'
} as const

export const DOCUMENT_PERMISSIONS = {
  VIEW: 'view',
  EDIT: 'edit',
  DOWNLOAD: 'download'
} as const

export const DOCUMENT_PERMISSIONS_TEXT = {
  [DOCUMENT_PERMISSIONS.VIEW]: '查看',
  [DOCUMENT_PERMISSIONS.EDIT]: '编辑',
  [DOCUMENT_PERMISSIONS.DOWNLOAD]: '下载'
} as const

export const CONTACT_TYPE = {
  INTERNAL: 'internal',
  EXTERNAL: 'external'
} as const

export const CONTACT_TYPE_TEXT = {
  [CONTACT_TYPE.INTERNAL]: '内部',
  [CONTACT_TYPE.EXTERNAL]: '外部'
} as const

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

export const TASK_PRIORITY_TEXT = {
  [TASK_PRIORITY.LOW]: '低',
  [TASK_PRIORITY.MEDIUM]: '中',
  [TASK_PRIORITY.HIGH]: '高'
} as const

export const TASK_PRIORITY_TYPE = {
  [TASK_PRIORITY.LOW]: 'info',
  [TASK_PRIORITY.MEDIUM]: 'warning',
  [TASK_PRIORITY.HIGH]: 'danger'
} as const

export const TASK_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const

export const TASK_STATUS_TEXT = {
  [TASK_STATUS.NOT_STARTED]: '未开始',
  [TASK_STATUS.IN_PROGRESS]: '进行中',
  [TASK_STATUS.COMPLETED]: '已完成'
} as const

export const TASK_STATUS_TYPE = {
  [TASK_STATUS.NOT_STARTED]: 'info',
  [TASK_STATUS.IN_PROGRESS]: 'primary',
  [TASK_STATUS.COMPLETED]: 'success'
} as const

export const ATTENDANCE_STATUS = {
  NORMAL: 'normal',
  LATE: 'late',
  EARLY_LEAVE: 'early_leave',
  ABSENT: 'absent',
  LEAVE: 'leave'
} as const

export const ATTENDANCE_STATUS_TEXT = {
  [ATTENDANCE_STATUS.NORMAL]: '正常',
  [ATTENDANCE_STATUS.LATE]: '迟到',
  [ATTENDANCE_STATUS.EARLY_LEAVE]: '早退',
  [ATTENDANCE_STATUS.ABSENT]: '旷工',
  [ATTENDANCE_STATUS.LEAVE]: '请假'
} as const

export const ATTENDANCE_STATUS_TYPE = {
  [ATTENDANCE_STATUS.NORMAL]: 'success',
  [ATTENDANCE_STATUS.LATE]: 'warning',
  [ATTENDANCE_STATUS.EARLY_LEAVE]: 'warning',
  [ATTENDANCE_STATUS.ABSENT]: 'danger',
  [ATTENDANCE_STATUS.LEAVE]: 'info'
} as const

export const DEPARTMENTS = [
  '技术部',
  '行政部',
  '人力资源部',
  '财务部',
  '市场部',
  '销售部',
  '生产部',
  '质量部'
] as const

export const LEAVE_TYPES = [
  '事假',
  '病假',
  '年假',
  '婚假',
  '产假',
  '丧假',
  '调休'
] as const

export const EXPENSE_TYPES = [
  '差旅费',
  '办公费',
  '招待费',
  '交通费',
  '通讯费',
  '福利费',
  '其他'
] as const

export const SEAL_TYPES = [
  '公章',
  '合同章',
  '财务章',
  '法人章',
  '发票章'
] as const

export const PAGE_SIZES = [10, 20, 50, 100] as const
