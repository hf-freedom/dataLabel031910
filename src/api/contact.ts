import request from '@/utils/request'
import type { ApiResponse, PageResponse, PageParams } from '@/types/api'
import type { Contact, ContactQueryForm, ContactFormData } from '@/types'

export function getInternalContactList(
  params: ContactQueryForm & PageParams
): Promise<PageResponse<Contact>> {
  return request.get('/contact/internal/list', { params })
}

export function getExternalContactList(
  params: ContactQueryForm & PageParams
): Promise<PageResponse<Contact>> {
  return request.get('/contact/external/list', { params })
}

export function getFavoriteContactList(params: PageParams): Promise<PageResponse<Contact>> {
  return request.get('/contact/favorite/list', { params })
}

export function getContactDetail(id: string): Promise<Contact> {
  return request.get(`/contact/${id}`)
}

export function createContact(data: ContactFormData): Promise<ApiResponse> {
  return request.post('/contact', data)
}

export function updateContact(id: string, data: ContactFormData): Promise<ApiResponse> {
  return request.put(`/contact/${id}`, data)
}

export function deleteContact(id: string): Promise<ApiResponse> {
  return request.delete(`/contact/${id}`)
}

export function toggleFavorite(id: string): Promise<ApiResponse> {
  return request.post(`/contact/${id}/favorite`)
}

export function exportContacts(params: ContactQueryForm): Promise<Blob> {
  return request.get('/contact/export', { params, responseType: 'blob' })
}

export function importContacts(data: FormData): Promise<ApiResponse> {
  return request.post('/contact/import', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
