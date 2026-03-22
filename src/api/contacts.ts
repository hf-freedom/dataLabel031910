import request from '@/utils/request'
import type { Contact, ContactForm, PageParams, PageResult } from '@/types'

export const contactsApi = {
  getList: (params: PageParams & { name?: string; department?: string; type?: string; category?: string }) => {
    return request<PageResult<Contact>>({
      url: '/contacts/list',
      method: 'get',
      params
    })
  },

  getFavoriteList: (params: PageParams) => {
    return request<PageResult<Contact>>({
      url: '/contacts/favorite',
      method: 'get',
      params
    })
  },

  getDetail: (id: string) => {
    return request<Contact>({
      url: `/contacts/detail`,
      method: 'get',
      params: { id }
    })
  },

  create: (data: ContactForm) => {
    return request({
      url: '/contacts/create',
      method: 'post',
      data
    })
  },

  update: (data: ContactForm) => {
    return request({
      url: '/contacts/update',
      method: 'put',
      data
    })
  },

  delete: (id: string) => {
    return request({
      url: `/contacts/delete`,
      method: 'delete',
      data: { id }
    })
  },

  toggleFavorite: (id: string) => {
    return request({
      url: `/contacts/toggleFavorite`,
      method: 'post',
      data: { id }
    })
  },

  getDepartments: () => {
    return request<string[]>({
      url: '/contacts/departments',
      method: 'get'
    })
  },

  getCategories: () => {
    return request<string[]>({
      url: '/contacts/categories',
      method: 'get'
    })
  }
}
