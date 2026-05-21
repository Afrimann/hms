import { ApiResponse } from "./auth.type";

export type CreateDepartmentRequest = {
    name: string;
    description: string;
    is_active: boolean;
}
export type Department = {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export type CreateDepartmentResponse = ApiResponse<Department>;

export type AllDepartmentsResponse = ApiResponse<Department[]>;

export type singleDepartmentResponse = ApiResponse<Department>;

export type UpdateDepartmentRequest = {
    name?: string;
    description?: string;
    is_active?: boolean;
}

export type UpdateDepartmentResponse = ApiResponse<Department>;

export type SoftDeleteDepartmentRequest = {
    is_active: boolean;
};
export type SoftDeleteDepartmentResponse = ApiResponse<{
    message: string;
}>;