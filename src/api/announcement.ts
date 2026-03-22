import request from '@/utils/request'
import type { Announcement, AnnouncementForm, PageParams, PageResult } from '@/types'

export const announcementApi = {
  getList: (params: PageParams & { title?: string; department?: string; status?: string }) => {
    return request<PageResult<Announcement>>({
      url: '/announcement/list',
      method: 'get',
      params
    })
  },

  getDetail: (id: string) => {
    return request<Announcement>({
      url: `/announcement/detail`,
      method: 'get',
      params: { id }
    })
  },

  create: (data: AnnouncementForm) => {
    return request({
      url: '/announcement/create',
      method: 'post',
      data
    })
  },

  update: (data: AnnouncementForm) => {
    return request({
      url: '/announcement/update',
      method: 'put',
      data
    })
  },

  delete: (id: string) => {
    return request({
      url: `/announcement/delete`,
      method: 'delete',
      data: { id }
    })
  },

  publish: (id: string) => {
    return request({
      url: `/announcement/publish`,
      method: 'post',
      data: { id }
    })
  },

  recall: (id: string) => {
    return request({
      url: `/announcement/recall`,
      method: 'post',
      data: { id }
    })
  },

  markRead: (id: string) => {
    return request({
      url: `/announcement/markRead`,
      method: 'post',
      data: { id }
    })
  }
}
