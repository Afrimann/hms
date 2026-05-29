import { ApiResponse } from "./auth.type";

export type CreateDepartmentRequest = {
  name: string;
  description: string;
  is_active: boolean;
};
export type Department = {
  department_id: number;
  code: string;
  name: string;
  description: string | null;
  is_active: boolean;
  head_user_id: number | null;
  created_at: string;
  updated_at: string;
};

export type CreateDepartmentResponse = ApiResponse<Department>;

export type AllDepartmentsResponse = ApiResponse<Department[]>;

export type singleDepartmentResponse = ApiResponse<Department>;

export type UpdateDepartmentRequest = {
  name?: string;
  description?: string;
  is_active?: boolean;
};

export type UpdateDepartmentResponse = ApiResponse<Department>;

export type SoftDeleteDepartmentRequest = {
  is_active: boolean;
};
export type SoftDeleteDepartmentResponse = ApiResponse<{
  message: string;
}>;

export type CreateDepartmentUnitResponse = ApiResponse<{
  id: number;
  department_id: number;
  department: {
    id: number;
    name: string;
    code: string; 
  };
  name: string;
  code: string;
  description: string | null;
  head_user_id: null;
  head: null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}>;
export type CreateDepartmentUnitRequest = {
  department_id: number;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
  head_user_id?: null;
};

export type ShowDepartmentUnitResponse = ApiResponse<{
  id: number;
  department_id: number;
  department: {
    id: number;
    name: string;
    code: string;
  };
  name: string;
  code: string;
  description: string | null;
  head_user_id: null;
  head: null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}>;

