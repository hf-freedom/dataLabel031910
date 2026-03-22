import request from '@/utils/request'
import type { Document, DocumentForm, PageParams, PageResult } from '@/types'

export const documentApi = {
  getList: (params: PageParams & { name?: string; type?: string; category?: string }) => {
    return request<PageResult<Document>>({
      url: '/document/list',
      method: 'get',
      params
    })
  },

  getDetail: (id: string) => {
    return request<Document>({
      url: `/document/detail`,
      method: 'get',
      params: { id }
    })
  },

  create: (data: DocumentForm) => {
    return request({
      url: '/document/create',
      method: 'post',
      data
    })
  },

  update: (data: DocumentForm) => {
    return request({
      url: '/document/update',
      method: 'put',
      data
    })
  },

  delete: (id: string) => {
    return request({
      url: `/document/delete`,
      method: 'delete',
      data: { id }
    })
  },

  download: (id: string) => {
    return request({
      url: `/document/download`,
      method: 'get',
      params: { id },
      responseType: 'blob'
    })
  },

  getCategories: () => {
    return request<string[]>({
      url: '/document/categories',
      method: 'get'
    })
  }
}
