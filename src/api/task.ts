import request from '@/utils/request'
import type { ApiResponse, PageResponse, PageParams } from '@/types/api'
import type {
  Task,
  TaskQueryForm,
  TaskFormData,
  TaskStatusFormData,
  TaskStatistics
} from '@/types'

export function getMyTaskList(params: TaskQueryForm & PageParams): Promise<PageResponse<Task>> {
  return request.get('/task/my/list', { params })
}

export function getCreatedTaskList(params: TaskQueryForm & PageParams): Promise<PageResponse<Task>> {
  return request.get('/task/created/list', { params })
}

export function getTaskDetail(id: string): Promise<Task> {
  return request.get(`/task/${id}`)
}

export function createTask(data: TaskFormData): Promise<ApiResponse> {
  return request.post('/task', data)
}

export function updateTask(id: string, data: TaskFormData): Promise<ApiResponse> {
  return request.put(`/task/${id}`, data)
}

export function deleteTask(id: string): Promise<ApiResponse> {
  return request.delete(`/task/${id}`)
}

export function updateTaskStatus(id: string, data: TaskStatusFormData): Promise<ApiResponse> {
  return request.put(`/task/${id}/status`, data)
}

export function remindTask(id: string): Promise<ApiResponse> {
  return request.post(`/task/${id}/remind`)
}

export function getTaskStatistics(): Promise<TaskStatistics> {
  return request.get('/task/statistics')
}

export function addTaskLog(id: string, content: string): Promise<ApiResponse> {
  return request.post(`/task/${id}/log`, { content })
}
