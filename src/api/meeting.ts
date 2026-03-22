import request from '@/utils/request'
import type { Meeting, MeetingForm, PageParams, PageResult } from '@/types'

export const meetingApi = {
  getList: (params: PageParams & { title?: string; status?: string }) => {
    return request<PageResult<Meeting>>({
      url: '/meeting/list',
      method: 'get',
      params
    })
  },

  getDetail: (id: string) => {
    return request<Meeting>({
      url: `/meeting/detail`,
      method: 'get',
      params: { id }
    })
  },

  create: (data: MeetingForm) => {
    return request({
      url: '/meeting/create',
      method: 'post',
      data
    })
  },

  update: (data: MeetingForm) => {
    return request({
      url: '/meeting/update',
      method: 'put',
      data
    })
  },

  delete: (id: string) => {
    return request({
      url: `/meeting/delete`,
      method: 'delete',
      data: { id }
    })
  },

  cancel: (id: string) => {
    return request({
      url: `/meeting/cancel`,
      method: 'post',
      data: { id }
    })
  },

  getRooms: () => {
    return request<Array<{ id: string; name: string; capacity: number }>>({
      url: '/meeting/rooms',
      method: 'get'
    })
  }
}
