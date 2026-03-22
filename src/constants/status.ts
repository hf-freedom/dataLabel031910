export const ANNOUNCEMENT_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  EXPIRED: 'expired'
} as const

export const ANNOUNCEMENT_STATUS_TEXT: Record<string, string> = {
  published: '已发布',
  draft: '草稿',
  expired: '已过期'
}

export const ANNOUNCEMENT_STATUS_TYPE: Record<string, string> = {
  published: 'success',
  draft: 'info',
  expired: 'danger'
}

export const ANNOUNCEMENT_SCOPE = {
  ALL: 'all',
  DEPARTMENT: 'department',
  SPECIFIC: 'specific'
} as const

export const ANNOUNCEMENT_SCOPE_TEXT: Record<string, string> = {
  all: '全员',
  department: '部门',
  specific: '指定人员'
}
