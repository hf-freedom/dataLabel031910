export interface DocumentQueryForm {
  name: string
  uploader: string
  dateRange: string[]
}

export interface DocumentUploadForm {
  type: 'system' | 'process' | 'material'
  permissions: 'view' | 'edit' | 'download'
}

export interface DocumentPermissionForm {
  permissions: 'view' | 'edit' | 'download'
}
