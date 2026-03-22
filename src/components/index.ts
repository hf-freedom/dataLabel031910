import type { Component } from 'vue'

export interface ActionButton {
  label: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  disabled?: boolean
  action?: () => void
}

export interface TableAction {
  label: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  icon?: Component | string
  handler: () => void
}

export { default as StatusTag } from './StatusTag/index.vue'
export { default as ActionButtons } from './ActionButtons/index.vue'
export { default as PageContainer } from './PageContainer/index.vue'
export { default as TableActions } from './TableActions/index.vue'
