export interface ContactQueryForm {
  name: string
  position: string
  category: string
}

export interface ContactFormData {
  id?: string
  name: string
  category?: string
  company?: string
  department?: string
  position?: string
  phone: string
  email?: string
  address?: string
  remark?: string
  type: 'internal' | 'external'
}
