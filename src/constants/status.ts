export const AnnouncementStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  EXPIRED: 'expired'
} as const

export const AnnouncementStatusMap: Record<string, { text: string; type: 'success' | 'info' | 'danger' }> = {
  [AnnouncementStatus.PUBLISHED]: { text: '已发布', type: 'success' },
  [AnnouncementStatus.DRAFT]: { text: '草稿', type: 'info' },
  [AnnouncementStatus.EXPIRED]: { text: '已过期', type: 'danger' }
}

export const MeetingStatus = {
  SCHEDULED: 'scheduled',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const

export const MeetingStatusMap: Record<string, { text: string; type: 'primary' | 'warning' | 'success' | 'info' }> = {
  [MeetingStatus.SCHEDULED]: { text: '已预约', type: 'primary' },
  [MeetingStatus.ONGOING]: { text: '进行中', type: 'warning' },
  [MeetingStatus.COMPLETED]: { text: '已完成', type: 'success' },
  [MeetingStatus.CANCELLED]: { text: '已取消', type: 'info' }
}

export const TaskStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const

export const TaskStatusMap: Record<string, { text: string; type: 'info' | 'warning' | 'success' }> = {
  [TaskStatus.NOT_STARTED]: { text: '未开始', type: 'info' },
  [TaskStatus.IN_PROGRESS]: { text: '进行中', type: 'warning' },
  [TaskStatus.COMPLETED]: { text: '已完成', type: 'success' }
}

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

export const TaskPriorityMap: Record<string, { text: string; type: 'info' | 'warning' | 'danger' }> = {
  [TaskPriority.LOW]: { text: '低', type: 'info' },
  [TaskPriority.MEDIUM]: { text: '中', type: 'warning' },
  [TaskPriority.HIGH]: { text: '高', type: 'danger' }
}

export const ApprovalStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  TRANSFERRED: 'transferred'
} as const

export const ApprovalStatusMap: Record<string, { text: string; type: 'warning' | 'success' | 'danger' | 'info' }> = {
  [ApprovalStatus.PENDING]: { text: '待审批', type: 'warning' },
  [ApprovalStatus.APPROVED]: { text: '已通过', type: 'success' },
  [ApprovalStatus.REJECTED]: { text: '已驳回', type: 'danger' },
  [ApprovalStatus.TRANSFERRED]: { text: '已转交', type: 'info' }
}

export const ApprovalType = {
  LEAVE: 'leave',
  EXPENSE: 'expense',
  SEAL: 'seal'
} as const

export const ApprovalTypeMap: Record<string, { text: string; type: 'primary' | 'success' | 'warning' }> = {
  [ApprovalType.LEAVE]: { text: '请假', type: 'primary' },
  [ApprovalType.EXPENSE]: { text: '报销', type: 'success' },
  [ApprovalType.SEAL]: { text: '用印', type: 'warning' }
}

export const VehicleStatus = {
  IDLE: 'idle',
  IN_USE: 'in_use',
  MAINTENANCE: 'maintenance'
} as const

export const VehicleStatusMap: Record<string, { text: string; type: 'success' | 'warning' | 'danger' }> = {
  [VehicleStatus.IDLE]: { text: '空闲', type: 'success' },
  [VehicleStatus.IN_USE]: { text: '使用中', type: 'warning' },
  [VehicleStatus.MAINTENANCE]: { text: '维修中', type: 'danger' }
}

export const VehicleApplicationStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_USE: 'in_use',
  COMPLETED: 'completed'
} as const

export const VehicleApplicationStatusMap: Record<string, { text: string; type: 'warning' | 'success' | 'danger' | 'primary' | 'info' }> = {
  [VehicleApplicationStatus.PENDING]: { text: '待审批', type: 'warning' },
  [VehicleApplicationStatus.APPROVED]: { text: '已批准', type: 'success' },
  [VehicleApplicationStatus.REJECTED]: { text: '已拒绝', type: 'danger' },
  [VehicleApplicationStatus.IN_USE]: { text: '使用中', type: 'primary' },
  [VehicleApplicationStatus.COMPLETED]: { text: '已完成', type: 'info' }
}

export const AttendanceStatus = {
  NORMAL: 'normal',
  LATE: 'late',
  EARLY_LEAVE: 'early_leave',
  ABSENT: 'absent',
  LEAVE: 'leave'
} as const

export const AttendanceStatusMap: Record<string, { text: string; type: 'success' | 'warning' | 'danger' | 'info' }> = {
  [AttendanceStatus.NORMAL]: { text: '正常', type: 'success' },
  [AttendanceStatus.LATE]: { text: '迟到', type: 'warning' },
  [AttendanceStatus.EARLY_LEAVE]: { text: '早退', type: 'warning' },
  [AttendanceStatus.ABSENT]: { text: '旷工', type: 'danger' },
  [AttendanceStatus.LEAVE]: { text: '请假', type: 'info' }
}

export const DocumentType = {
  SYSTEM: 'system',
  PROCESS: 'process',
  MATERIAL: 'material'
} as const

export const DocumentTypeMap: Record<string, string> = {
  [DocumentType.SYSTEM]: '制度',
  [DocumentType.PROCESS]: '流程',
  [DocumentType.MATERIAL]: '资料'
}

export const DocumentPermission = {
  VIEW: 'view',
  EDIT: 'edit',
  DOWNLOAD: 'download'
} as const

export const DocumentPermissionMap: Record<string, { text: string; type: 'info' | 'warning' | 'success' }> = {
  [DocumentPermission.VIEW]: { text: '仅查看', type: 'info' },
  [DocumentPermission.EDIT]: { text: '可编辑', type: 'warning' },
  [DocumentPermission.DOWNLOAD]: { text: '可下载', type: 'success' }
}

export const Departments = [
  { label: '技术部', value: '技术部' },
  { label: '行政部', value: '行政部' },
  { label: '人力资源部', value: '人力资源部' }
] as const

export const ContactCategories = [
  { label: '客户', value: '客户' },
  { label: '合作方', value: '合作方' },
  { label: '供应商', value: '供应商' }
] as const
