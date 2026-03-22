import request from '@/utils/request'
import type { Vehicle, VehicleApplication, VehicleApplicationForm, PageParams, PageResult } from '@/types'

export const vehicleApi = {
  getVehicleList: (params: PageParams) => {
    return request<PageResult<Vehicle>>({
      url: '/vehicle/list',
      method: 'get',
      params
    })
  },

  getApplicationList: (params: PageParams & { applicant?: string; plateNumber?: string; startDate?: string; endDate?: string }) => {
    return request<PageResult<VehicleApplication>>({
      url: '/vehicle/application/list',
      method: 'get',
      params
    })
  },

  getPendingDispatchList: (params: PageParams) => {
    return request<PageResult<VehicleApplication>>({
      url: '/vehicle/application/pending',
      method: 'get',
      params
    })
  },

  getRecordList: (params: PageParams & { applicant?: string; plateNumber?: string; startDate?: string; endDate?: string }) => {
    return request<PageResult<VehicleApplication>>({
      url: '/vehicle/record/list',
      method: 'get',
      params
    })
  },

  getVehicleDetail: (id: string) => {
    return request<Vehicle>({
      url: `/vehicle/detail`,
      method: 'get',
      params: { id }
    })
  },

  getApplicationDetail: (id: string) => {
    return request<VehicleApplication>({
      url: `/vehicle/application/detail`,
      method: 'get',
      params: { id }
    })
  },

  createApplication: (data: VehicleApplicationForm) => {
    return request({
      url: '/vehicle/application/create',
      method: 'post',
      data
    })
  },

  dispatch: (data: { id: string; vehicleId: string; driver: string; remark?: string }) => {
    return request({
      url: '/vehicle/dispatch',
      method: 'post',
      data
    })
  },

  withdrawApplication: (id: string) => {
    return request({
      url: `/vehicle/application/withdraw`,
      method: 'post',
      data: { id }
    })
  },

  maintenance: (id: string) => {
    return request({
      url: `/vehicle/maintenance`,
      method: 'post',
      data: { id }
    })
  }
}
