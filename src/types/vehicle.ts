export interface VehicleQueryForm {
  applicant: string
  plateNumber: string
  dateRange: string[]
}

export interface VehicleApplicationFormData {
  useTime: string
  returnTime: string
  destination: string
  reason: string
  requiredModel?: string
}

export interface DispatchFormData {
  vehicleId: string
  driver: string
  remark: string
}
