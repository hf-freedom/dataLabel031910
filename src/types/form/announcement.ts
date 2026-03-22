export interface AnnouncementFormData {
  id?: string
  title: string
  content: string
  scope: 'all' | 'department' | 'specific'
  scopeData: string[]
  effectiveTime: string
  expireTime: string
  status: 'draft' | 'published' | 'expired'
}

export interface AnnouncementQueryForm {
  title: string
  department: string
  status: string
}
