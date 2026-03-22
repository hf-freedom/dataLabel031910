export interface ApprovalQueryForm {
  title: string
  type: string
  status: string
}

export interface LeaveFormData {
  leaveType: string
  startTime: string
  endTime: string
  days: number
  reason: string
}

export interface ExpenseFormData {
  expenseType: string
  amount: number
  reason: string
}

export interface SealFormData {
  sealType: string
  sealTime: string
  reason: string
}

export interface ApprovalFormData {
  type: 'leave' | 'expense' | 'seal'
  title: string
  approvers: string[]
  leaveType?: string
  startTime?: string
  endTime?: string
  days?: number
  expenseType?: string
  amount?: number
  sealType?: string
  sealTime?: string
  reason?: string
}

export interface ApproveFormData {
  action: 'approve' | 'reject' | 'transfer'
  transferTo?: string
  opinion?: string
}
