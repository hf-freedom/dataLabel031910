export const CONTACT_TYPE = {
  INTERNAL: 'internal',
  EXTERNAL: 'external'
} as const

export const CONTACT_TYPE_TEXT: Record<string, string> = {
  internal: '内部员工',
  external: '外部联系人'
}

export const CONTACT_CATEGORY = {
  CUSTOMER: '客户',
  PARTNER: '合作方',
  SUPPLIER: '供应商'
} as const
