import request from '@/utils/request'
import type { ApiResponse, PageResponse, PageParams } from '@/types/api'
import type {
  Vehicle,
  VehicleApplication,
  VehicleQueryForm,
  VehicleApplicationFormData,
  DispatchFormData
} from '@/types'

export function getVehicleList(params: PageParams): Promise<PageResponse<Vehicle>> {
  return request.get('/vehicle/list', { params })
}

export function getVehicleDetail(id: string): Promise<Vehicle> {
  return request.get(`/vehicle/${id}`)
}

export function getApplicationList(
  params: VehicleQueryForm & PageParams
): Promise<PageResponse<VehicleApplication>> {
  return request.get('/vehicle/application/list', { params })
}

export function createApplication(data: VehicleApplicationFormData): Promise<ApiResponse> {
  return request.post('/vehicle/application', data)
}

export function getPendingDispatchList(params: PageParams): Promise<PageResponse<VehicleApplication>> {
  return request.get('/vehicle/dispatch/pending', { params })
}

export function dispatchVehicle(
  applicationId: string,
  data: DispatchFormData
): Promise<ApiResponse> {
  return request.post(`/vehicle/dispatch/${applicationId}`, data)
}

export function getRecordList(
  params: VehicleQueryForm & PageParams
): Promise<PageResponse<VehicleApplication>> {
  return request.get('/vehicle/record/list', { params })
}

export function withdrawApplication(id: string): Promise<ApiResponse> {
  return request.post(`/vehicle/application/${id}/withdraw`)
}
