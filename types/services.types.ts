
import { ApiResponse } from "./auth.type";
import { Department } from "./department.type"

export type Service = {
    id: number
    department_id: number
    unit_id: number | null
    service_code: string
    service_name: string
    service_description: string | null
    amount: string
    is_billable: boolean
    is_active: boolean
    department: Partial<Omit<Department, 'created_at' | 'created_by' | 'updated_at' | 'is_active' | 'description'>>
    unit: string | null
    created_at: string
    updated_at: string
}
export type ListServicesResponse = ApiResponse<Service[]>;
export type CreateServiceRequest = {
    department_id: number,
    unit_id: number | null,
    service_name: string
    service_type: string
    service_description: string
    amount: number,
    is_billable: boolean
}

export type CreateServiceResponse = ApiResponse<Omit<Service, 'department' | 'unit'>>
export type UpdateServiceRequest = Partial<CreateServiceRequest>
export type UpdateServiceResponse = CreateServiceResponse
export type ReactivateServiceResponse = CreateServiceResponse
export type DeactivateServiceResponse = CreateServiceResponse