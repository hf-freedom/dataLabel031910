import request from '@/utils/request'
import type {
  TaskListParams,
  TaskListResponse,
  TaskDetailResponse,
  TaskCreateRequest,
  TaskUpdateRequest,
  TaskStatusUpdateRequest,
  TaskStatisticsResponse
} from '@/types/api'

export const taskApi = {
  getList: (params: TaskListParams, signal?: AbortSignal) =>
    request<TaskListResponse>({
      url: '/task/list',
      method: 'get',
      params,
      signal
    }),

  getDetail: (id: string, signal?: AbortSignal) =>
    request<TaskDetailResponse>({
      url: `/task/${id}`,
      method: 'get',
      signal
    }),

  create: (data: TaskCreateRequest, signal?: AbortSignal) =>
    request<TaskDetailResponse>({
      url: '/task',
      method: 'post',
      data,
      signal
    }),

  update: (data: TaskUpdateRequest, signal?: AbortSignal) =>
    request<TaskDetailResponse>({
      url: `/task/${data.id}`,
      method: 'put',
      data,
      signal
    }),

  delete: (id: string, signal?: AbortSignal) =>
    request({
      url: `/task/${id}`,
      method: 'delete',
      signal
    }),

  updateStatus: (data: TaskStatusUpdateRequest, signal?: AbortSignal) =>
    request({
      url: `/task/${data.id}/status`,
      method: 'post',
      data,
      signal
    }),

  remind: (id: string, signal?: AbortSignal) =>
    request({
      url: `/task/${id}/remind`,
      method: 'post',
      signal
    }),

  getStatistics: (signal?: AbortSignal) =>
    request<TaskStatisticsResponse>({
      url: '/task/statistics',
      method: 'get',
      signal
    })
}
