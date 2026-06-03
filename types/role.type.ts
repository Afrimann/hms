import { ApiResponse } from "./auth.type";

export type RolePermission = {
  id: number;
  name: string;
  is_system: number;
  pivot: {
    role_id: number;
    permission_id: number;
  };
};

export type Role = {
  id: number;
  name: string;
  guard_name: string;
  is_system: number;
  created_at: string;
  updated_at: string;
  permissions: RolePermission[];
};

export type AllRolesResponse = ApiResponse<Role[]>;

export type RoleByIdResponse = ApiResponse<Role>;
