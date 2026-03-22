import type { ApiResponse, PaginationParams, PaginationResult } from './common'
import type { Contact } from '../index'

export interface ContactListParams extends PaginationParams {
  name?: string
  position?: string
  category?: string
  deptId?: string
}

export interface ContactListResponse extends ApiResponse<PaginationResult<Contact>> {}

export interface ContactDetailResponse extends ApiResponse<Contact> {}

export interface ContactCreateRequest {
  name: string
  phone: string
  email?: string
  department?: string
  position?: string
  type: 'internal' | 'external'
  category?: string
}

export interface ContactUpdateRequest extends Partial<ContactCreateRequest> {
  id: string
}

export interface ContactFavoriteRequest {
  id: string
  isFavorite: boolean
}
