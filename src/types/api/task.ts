import type { ApiResponse, PaginationParams, PaginationResult } from './common'
import type { Task } from '../index'

export interface TaskListParams extends PaginationParams {
  title?: string
  status?: string
  priority?: string
  tab: 'my' | 'created'
}

export interface TaskListResponse extends ApiResponse<PaginationResult<Task>> {}

export interface TaskDetailResponse extends ApiResponse<Task> {}

export interface TaskCreateRequest {
  title: string
  description: string
  assignee: string
  deadline: string
  priority: 'low' | 'medium' | 'high'
  cc?: string[]
  attachments?: string[]
}

export interface TaskUpdateRequest extends Partial<TaskCreateRequest> {
  id: string
}

export interface TaskStatusUpdateRequest {
  id: string
  status: 'not_started' | 'in_progress' | 'completed'
  content?: string
  attachments?: string[]
}

export interface TaskStatisticsResponse extends ApiResponse<{
  total: number
  completed: number
  inProgress: number
  overdue: number
}>
