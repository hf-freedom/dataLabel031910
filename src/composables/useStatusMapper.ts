import {
  AnnouncementStatusMap,
  MeetingStatusMap,
  TaskStatusMap,
  TaskPriorityMap,
  ApprovalStatusMap,
  ApprovalTypeMap,
  VehicleStatusMap,
  VehicleApplicationStatusMap,
  AttendanceStatusMap,
  DocumentTypeMap,
  DocumentPermissionMap
} from '@/constants'

export function useStatusMapper() {
  const getAnnouncementStatus = (status: string) => {
    return AnnouncementStatusMap[status] || { text: '未知', type: 'info' }
  }

  const getMeetingStatus = (status: string) => {
    return MeetingStatusMap[status] || { text: '未知', type: 'info' }
  }

  const getTaskStatus = (status: string) => {
    return TaskStatusMap[status] || { text: '未知', type: 'info' }
  }

  const getTaskPriority = (priority: string) => {
    return TaskPriorityMap[priority] || { text: '未知', type: 'info' }
  }

  const getApprovalStatus = (status: string) => {
    return ApprovalStatusMap[status] || { text: '未知', type: 'info' }
  }

  const getApprovalType = (type: string) => {
    return ApprovalTypeMap[type] || { text: '未知', type: 'info' }
  }

  const getVehicleStatus = (status: string) => {
    return VehicleStatusMap[status] || { text: '未知', type: 'info' }
  }

  const getVehicleApplicationStatus = (status: string) => {
    return VehicleApplicationStatusMap[status] || { text: '未知', type: 'info' }
  }

  const getAttendanceStatus = (status: string) => {
    return AttendanceStatusMap[status] || { text: '未知', type: 'info' }
  }

  const getDocumentType = (type: string) => {
    return DocumentTypeMap[type] || '未知'
  }

  const getDocumentPermission = (permission: string) => {
    return DocumentPermissionMap[permission] || { text: '未知', type: 'info' }
  }

  return {
    getAnnouncementStatus,
    getMeetingStatus,
    getTaskStatus,
    getTaskPriority,
    getApprovalStatus,
    getApprovalType,
    getVehicleStatus,
    getVehicleApplicationStatus,
    getAttendanceStatus,
    getDocumentType,
    getDocumentPermission
  }
}
