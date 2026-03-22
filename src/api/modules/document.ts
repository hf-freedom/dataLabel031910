import request from '@/utils/request'
import type {
  DocumentListParams,
  DocumentListResponse,
  DocumentDetailResponse,
  DocumentUploadRequest,
  DocumentUpdateRequest,
  DocumentVersionRollbackRequest
} from '@/types/api'

export const documentApi = {
  getList: (params: DocumentListParams, signal?: AbortSignal) =>
    request<DocumentListResponse>({
      url: '/document/list',
      method: 'get',
      params,
      signal
    }),

  getDetail: (id: string, signal?: AbortSignal) =>
    request<DocumentDetailResponse>({
      url: `/document/${id}`,
      method: 'get',
      signal
    }),

  upload: (data: DocumentUploadRequest, signal?: AbortSignal) => {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('name', data.name)
    formData.append('type', data.type)
    formData.append('permissions', data.permissions)
    if (data.folderId) {
      formData.append('folderId', data.folderId)
    }
    return request({
      url: '/document/upload',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      signal
    })
  },

  update: (data: DocumentUpdateRequest, signal?: AbortSignal) =>
    request({
      url: `/document/${data.id}`,
      method: 'put',
      data,
      signal
    }),

  delete: (id: string, signal?: AbortSignal) =>
    request({
      url: `/document/${id}`,
      method: 'delete',
      signal
    }),

  download: (id: string, signal?: AbortSignal) =>
    request({
      url: `/document/${id}/download`,
      method: 'get',
      responseType: 'blob',
      signal
    }),

  preview: (id: string, signal?: AbortSignal) =>
    request({
      url: `/document/${id}/preview`,
      method: 'get',
      signal
    }),

  rollbackVersion: (data: DocumentVersionRollbackRequest, signal?: AbortSignal) =>
    request({
      url: `/document/${data.documentId}/rollback`,
      method: 'post',
      data: { version: data.version },
      signal
    })
}
