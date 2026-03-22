export interface TaskQueryForm {
  title: string
  status: string
  priority: string
}

export interface TaskFormData {
  id?: string
  title: string
  description: string
  assignee: string
  cc: string[]
  deadline: string
  priority: 'low' | 'medium' | 'high'
}

export interface TaskStatusForm {
  status: 'not_started' | 'in_progress' | 'completed'
  content: string
}
