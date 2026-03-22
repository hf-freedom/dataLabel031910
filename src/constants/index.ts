export * from './status'
export * from './approval'
export * from './meeting'
export * from './vehicle'
export * from './task'
export * from './attendance'
export * from './document'
export * from './contact'

export const DEPARTMENTS = [
  '技术部',
  '行政部',
  '人力资源部'
] as const

export const EMPLOYEES = [
  '张三',
  '李四',
  '王五',
  '赵六',
  '孙七'
] as const

export const APPROVERS = [
  '张经理',
  '李总监',
  '王副总'
] as const

export const DRIVERS = [
  '张师傅',
  '李师傅',
  '王师傅'
] as const

export const MEETING_ROOMS = [
  '会议室A',
  '会议室B',
  '会议室C'
] as const
