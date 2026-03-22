export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface PageParams {
  page: number
  pageSize: number
}

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

export interface AnnouncementForm {
  id?: string
  title: string
  content: string
  scope: 'all' | 'department' | 'specific'
  scopeData: string[]
  effectiveTime: string
  expireTime: string
  attachments?: string[]
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

export interface DocumentForm {
  id?: string
  name: string
  type: 'system' | 'process' | 'material'
  category: string
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

export interface ApprovalForm {
  id?: string
  type: 'leave' | 'expense' | 'seal'
  title: string
  approvers: string[]
  reason: string
  attachments?: string[]
  leaveType?: string
  startTime?: string
  endTime?: string
  days?: number
  expenseType?: string
  amount?: number
  sealType?: string
  sealTime?: string
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

export interface MeetingForm {
  id?: string
  title: string
  time: string
  location: string
  roomId: string
  attendees: string[]
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

export interface VehicleApplicationForm {
  id?: string
  useTime: string
  returnTime: string
  destination: string
  reason: string
  requiredModel?: string
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

export interface ContactForm {
  id?: string
  name: string
  phone: string
  email?: string
  department?: string
  position?: string
  type: 'internal' | 'external'
  category?: string
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

export interface TaskForm {
  id?: string
  title: string
  description: string
  assignee: string
  deadline: string
  priority: 'low' | 'medium' | 'high'
  cc?: string[]
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

export interface LoginForm {
  username: string
  password: string
  remember: boolean
}

export interface LoginResponse {
  token: string
  userInfo: {
    id: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    avatar?: string
  }
}