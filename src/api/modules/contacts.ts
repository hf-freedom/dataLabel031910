import request from '@/utils/request'
import type {
  ContactListParams,
  ContactListResponse,
  ContactDetailResponse,
  ContactCreateRequest,
  ContactUpdateRequest,
  ContactFavoriteRequest
} from '@/types/api'

export const contactsApi = {
  getList: (params: ContactListParams, signal?: AbortSignal) =>
    request<ContactListResponse>({
      url: '/contacts/list',
      method: 'get',
      params,
      signal
    }),

  getDetail: (id: string, signal?: AbortSignal) =>
    request<ContactDetailResponse>({
      url: `/contacts/${id}`,
      method: 'get',
      signal
    }),

  create: (data: ContactCreateRequest, signal?: AbortSignal) =>
    request<ContactDetailResponse>({
      url: '/contacts',
      method: 'post',
      data,
      signal
    }),

  update: (data: ContactUpdateRequest, signal?: AbortSignal) =>
    request<ContactDetailResponse>({
      url: `/contacts/${data.id}`,
      method: 'put',
      data,
      signal
    }),

  delete: (id: string, signal?: AbortSignal) =>
    request({
      url: `/contacts/${id}`,
      method: 'delete',
      signal
    }),

  setFavorite: (data: ContactFavoriteRequest, signal?: AbortSignal) =>
    request({
      url: `/contacts/${data.id}/favorite`,
      method: 'post',
      data: { isFavorite: data.isFavorite },
      signal
    }),

  getFavorites: (params: { page: number; pageSize: number }, signal?: AbortSignal) =>
    request<ContactListResponse>({
      url: '/contacts/favorites',
      method: 'get',
      params,
      signal
    }),

  export: (signal?: AbortSignal) =>
    request({
      url: '/contacts/export',
      method: 'get',
      responseType: 'blob',
      signal
    }),

  import: (file: File, signal?: AbortSignal) => {
    const formData = new FormData()
    formData.append('file', file)
    return request({
      url: '/contacts/import',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      signal
    })
  }
}
