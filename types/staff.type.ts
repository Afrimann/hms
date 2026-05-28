import { ApiResponse } from "./auth.type";
import { Department } from "./department.type";

export type Staff = {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_active: boolean;
  email_verified_at: string;
  joined_at: string | null;
  roles: string[];
  departments: Department[];
  created_at: string;
  updated_at: string;
};

export type AllStaffResponse = ApiResponse<Staff[]>;

export type StaffByIdResponse = ApiResponse<Staff>;

export type CreateStaffRequest = {
  email: string;
  role: string;
  department_id: number;
};

export type CreateStaffResponse = ApiResponse<Staff>;

export type UpdateStaffRequest = {
  data: Partial<CreateStaffRequest>;
};

export type AcceptInviteRequest = {
  token: string;
  first_name: string
  last_name: string
  phone: string
  password: string;
  password_confirmation: string;
};

export type RejectInviteRequest = {
  token: string;
}; 