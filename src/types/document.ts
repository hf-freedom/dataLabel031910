export interface DocumentQueryForm {
  name: string
  uploader: string
  dateRange: string[]
}

export interface DocumentFormData {
  id?: string
  name: string
  type: 'system' | 'process' | 'material'
  category: string
  permissions: 'view' | 'edit' | 'download'
}

export interface UploadFormData {
  type: 'system' | 'process' | 'material'
  permissions: 'view' | 'edit' | 'download'
}
