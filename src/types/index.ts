export interface Announcement {
  id: string
  title: string
  content: string
  attachments?: string[]
  scope: 'all' | 'department' | 'specific'
  scopeData?: string[]
  publishTime: string
  effectiveTime: string
  expireTime: string
  status: 'draft' | 'published' | 'expired'
  publisher: string
  department: string
  readStatus?: boolean
}

export interface Document {
  id: string
  name: string
  type: 'system' | 'process' | 'material'
  category: string
  path: string
  version: number
  versions: Array<{
    version: number
    uploadTime: string
    uploader: string
  }>
  permissions: 'view' | 'edit' | 'download'
  uploader: string
  uploadTime: string
  size: number
  keywords: string[]
}

export interface Approval {
  id: string
  type: 'leave' | 'expense' | 'seal'
  title: string
  applicant: string
  department: string
  applyTime: string
  status: 'pending' | 'approved' | 'rejected' | 'transferred'
  currentApprover: string
  approvers: Array<{
    name: string
    status: 'pending' | 'approved' | 'rejected'
    opinion?: string
    time?: string
  }>
  formData: any
  attachments?: string[]
}

export interface Meeting {
  id: string
  title: string
  time: string
  location: string
  roomId: string
  attendees: string[]
  organizer: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  minutes?: string
  materials?: string[]
}

export interface Vehicle {
  id: string
  plateNumber: string
  model: string
  driver: string
  driverPhone: string
  status: 'idle' | 'in_use' | 'maintenance'
  mileage: number
  lastMaintenance: string
}

export interface VehicleApplication {
  id: string
  applicant: string
  department: string
  useTime: string
  returnTime: string
  destination: string
  reason: string
  requiredModel?: string
  status: 'pending' | 'approved' | 'rejected' | 'in_use' | 'completed'
  assignedVehicle?: string
  assignedDriver?: string
  mileage?: number
  cost?: number
}

export interface Contact {
  id: string
  name: string
  phone: string
  email?: string
  department?: string
  position?: string
  type: 'internal' | 'external'
  category?: string
  isFavorite?: boolean
}

export interface Task {
  id: string
  title: string
  description: string
  assignee: string
  department: string
  creator: string
  createTime: string
  deadline: string
  priority: 'low' | 'medium' | 'high'
  status: 'not_started' | 'in_progress' | 'completed'
  cc?: string[]
  logs: Array<{
    content: string
    time: string
    author: string
    attachments?: string[]
  }>
  attachments?: string[]
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  department: string
  date: string
  checkInTime?: string
  checkOutTime?: string
  status: 'normal' | 'late' | 'early_leave' | 'absent' | 'leave'
  leaveType?: string
  isAbnormal: boolean
}