import type { ApiResponse, PaginationParams, PaginationResult } from './common'
import type { Vehicle, VehicleApplication } from '../index'

export interface VehicleListParams extends PaginationParams {
  status?: string
}

export interface VehicleListResponse extends ApiResponse<PaginationResult<Vehicle>> {}

export interface VehicleApplicationListParams extends PaginationParams {
  applicant?: string
  plateNumber?: string
  dateRange?: string[]
  status?: string
}

export interface VehicleApplicationListResponse extends ApiResponse<PaginationResult<VehicleApplication>> {}

export interface VehicleApplicationCreateRequest {
  useTime: string
  returnTime: string
  destination: string
  reason: string
  requiredModel?: string
}

export interface VehicleDispatchRequest {
  applicationId: string
  vehicleId: string
  driver: string
  remark?: string
}

export interface VehicleDispatchResponse extends ApiResponse<VehicleApplication> {}
