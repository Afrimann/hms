import {
  AcceptInviteRequest,
  AllStaffResponse,
  CreateStaffRequest,
  CreateStaffResponse,
  RejectInviteRequest,
  StaffByIdResponse,
} from "@/types/staff.type";
import { AllRolesResponse } from "@/types/role.type";
import { apiClient } from "../api-client";
import { ApiResponse } from "@/types/auth.type";

class StaffRepository {
  private readonly basePath = "/api/staff";

  getStaffById(id: number, token: string) {
    return apiClient<StaffByIdResponse>(`${this.basePath}/${id}`, {
      method: "GET",
      token,  
    });
  }

  getAllStaff(token: string) {
    return apiClient<AllStaffResponse>(this.basePath, {
      method: "GET",
      token,
    });
  }

  createNewStaff(data: CreateStaffRequest, token: string) {
    return apiClient<CreateStaffResponse>(this.basePath, {
      method: "POST",
      body: data,
      token,
    });
  }

  updateStaff(id: number, data: Partial<CreateStaffRequest>, token: string) {
    return apiClient<StaffByIdResponse>(`${this.basePath}/${id}`, {
      method: "PUT",
      body: data,
      token,
    });
  }

  deactivateStaff(id: number, token: string) {
    return apiClient<ApiResponse<null>>(`${this.basePath}/${id}/deactivate`, {
      method: "PUT",
      token,
    });
  }

  reactivateStaff(id: number, token: string) {
    return apiClient<ApiResponse<null>>(`${this.basePath}/${id}/reactivate`, {
      method: "PUT",
      token,
    });
  }

  resendInvite(id: number, token: string) {
    return apiClient<ApiResponse<null>>(`${this.basePath}/${id}/resend-invite`, {
      method: "POST",
      token,
    });
  }

  acceptInvite(data: AcceptInviteRequest) {
    return apiClient<ApiResponse<null>>(`${this.basePath}/invite/accept`, {
      method: "POST",
      body: data,
    });
  }

  rejectInvite(data: RejectInviteRequest) {
    return apiClient<ApiResponse<null>>(`${this.basePath}/invite/reject`, {
      method: "POST",
      body: data,
    });
  }

  getAllRoles(token: string) {
    return apiClient<AllRolesResponse>('/api/roles', {
      method: "GET",
      token,
    });
  }
}

export const staffRepository = new StaffRepository();