export interface ApprovalCreateForm {
  type: string
  title: string
  approvers: string[]
  leaveType: string
  startTime: string
  endTime: string
  days: number
  expenseType: string
  amount: number
  sealType: string
  sealTime: string
  reason: string
}

export interface ApprovalActionForm {
  action: 'approve' | 'reject' | 'transfer'
  transferTo: string
  opinion: string
}
