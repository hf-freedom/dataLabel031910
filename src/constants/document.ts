export const DOCUMENT_TYPE = {
  SYSTEM: 'system',
  PROCESS: 'process',
  MATERIAL: 'material'
} as const

export const DOCUMENT_TYPE_TEXT: Record<string, string> = {
  system: '制度',
  process: '流程',
  material: '资料'
}

export const DOCUMENT_PERMISSION = {
  VIEW: 'view',
  EDIT: 'edit',
  DOWNLOAD: 'download'
} as const

export const DOCUMENT_PERMISSION_TEXT: Record<string, string> = {
  view: '仅查看',
  edit: '可编辑',
  download: '可下载'
}

export const DOCUMENT_PERMISSION_TYPE: Record<string, string> = {
  view: 'info',
  edit: 'warning',
  download: 'success'
}
