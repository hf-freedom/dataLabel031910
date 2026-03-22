import request from '@/utils/request'
import type { ApiResponse, PageResponse, PageParams } from '@/types/api'
import type { Document, DocumentQueryForm, DocumentFormData } from '@/types'

export function getDocumentList(
  params: DocumentQueryForm & PageParams
): Promise<PageResponse<Document>> {
  return request.get('/document/list', { params })
}

export function getDocumentDetail(id: string): Promise<Document> {
  return request.get(`/document/${id}`)
}

export function uploadDocument(data: FormData): Promise<ApiResponse> {
  return request.post('/document/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function deleteDocument(id: string): Promise<ApiResponse> {
  return request.delete(`/document/${id}`)
}

export function updateDocumentPermission(
  id: string,
  permissions: string
): Promise<ApiResponse> {
  return request.put(`/document/${id}/permission`, { permissions })
}

export function rollbackDocument(id: string, version: number): Promise<ApiResponse> {
  return request.post(`/document/${id}/rollback`, { version })
}

export function downloadDocument(id: string): Promise<Blob> {
  return request.get(`/document/${id}/download`, { responseType: 'blob' })
}
