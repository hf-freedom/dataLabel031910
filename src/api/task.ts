import request from '@/utils/request'
import type { Task, TaskForm, PageParams, PageResult } from '@/types'

export const taskApi = {
  getList: (params: PageParams & { title?: string; assignee?: string; status?: string; priority?: string }) => {
    return request<PageResult<Task>>({
      url: '/task/list',
      method: 'get',
      params
    })
  },

  getMyList: (params: PageParams) => {
    return request<PageResult<Task>>({
      url: '/task/my',
      method: 'get',
      params
    })
  },

  getCcList: (params: PageParams) => {
    return request<PageResult<Task>>({
      url: '/task/cc',
      method: 'get',
      params
    })
  },

  getDetail: (id: string) => {
    return request<Task>({
      url: `/task/detail`,
      method: 'get',
      params: { id }
    })
  },

  create: (data: TaskForm) => {
    return request({
      url: '/task/create',
      method: 'post',
      data
    })
  },

  update: (data: TaskForm) => {
    return request({
      url: '/task/update',
      method: 'put',
      data
    })
  },

  delete: (id: string) => {
    return request({
      url: `/task/delete`,
      method: 'delete',
      data: { id }
    })
  },

  updateStatus: (data: { id: string; status: string; comment?: string }) => {
    return request({
      url: `/task/updateStatus`,
      method: 'post',
      data
    })
  },

  addLog: (data: { id: string; content: string; attachments?: string[] }) => {
    return request({
      url: `/task/addLog`,
      method: 'post',
      data
    })
  }
}
