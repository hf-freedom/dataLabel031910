import type { ApiResponse, PaginationParams, PaginationResult } from './common'
import type { Document } from '../index'

export interface DocumentListParams extends PaginationParams {
  name?: string
  uploader?: string
  dateRange?: string[]
  folderId?: string
}

export interface DocumentListResponse extends ApiResponse<PaginationResult<Document>> {}

export interface DocumentDetailResponse extends ApiResponse<Document> {}

export interface DocumentUploadRequest {
  name: string
  type: 'system' | 'process' | 'material'
  permissions: 'view' | 'edit' | 'download'
  folderId?: string
  file: File
}

export interface DocumentUpdateRequest {
  id: string
  permissions?: 'view' | 'edit' | 'download'
}

export interface DocumentVersionRollbackRequest {
  documentId: string
  version: number
}
