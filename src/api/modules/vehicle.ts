import request from '@/utils/request'
import type {
  VehicleListParams,
  VehicleListResponse,
  VehicleApplicationListParams,
  VehicleApplicationListResponse,
  VehicleApplicationCreateRequest,
  VehicleDispatchRequest,
  VehicleDispatchResponse
} from '@/types/api'

export const vehicleApi = {
  getVehicleList: (params: VehicleListParams, signal?: AbortSignal) =>
    request<VehicleListResponse>({
      url: '/vehicle/list',
      method: 'get',
      params,
      signal
    }),

  getApplicationList: (params: VehicleApplicationListParams, signal?: AbortSignal) =>
    request<VehicleApplicationListResponse>({
      url: '/vehicle/application/list',
      method: 'get',
      params,
      signal
    }),

  createApplication: (data: VehicleApplicationCreateRequest, signal?: AbortSignal) =>
    request({
      url: '/vehicle/application',
      method: 'post',
      data,
      signal
    }),

  dispatch: (data: VehicleDispatchRequest, signal?: AbortSignal) =>
    request<VehicleDispatchResponse>({
      url: `/vehicle/application/${data.applicationId}/dispatch`,
      method: 'post',
      data,
      signal
    }),

  withdrawApplication: (id: string, signal?: AbortSignal) =>
    request({
      url: `/vehicle/application/${id}/withdraw`,
      method: 'post',
      signal
    }),

  getVehicleDetail: (id: string, signal?: AbortSignal) =>
    request({
      url: `/vehicle/${id}`,
      method: 'get',
      signal
    })
}
