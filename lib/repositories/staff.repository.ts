import {
  AcceptInviteRequest,
  CreateStaffRequest,
  CreateStaffResponse,
  RejectInviteRequest,
  Staff,
} from "@/types/staff.type";
import { apiClient } from "../api-client";

class StaffRepository {
  private readonly basePath = "/api/staff";

  getStaffById(id: number, token: string) {
    return apiClient<Staff>(`${this.basePath}/${id}`, {
      method: "GET",
      token,
    });
  }

  getAllStaff(token: string) {
    return apiClient<Staff[]>(this.basePath, {
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
    return apiClient(`${this.basePath}/${id}`, {
      method: "PUT",
      body: data,
      token,
    });
  }

  deactivateStaff(id: number, token: string) {
    return apiClient(`${this.basePath}/${id}/deactivate`, {
      method: "PUT",
      token,
    });
  }

  reactivateStaff(id: number, token: string) {
    return apiClient(`${this.basePath}/${id}/reactivate`, {
      method: "PUT",
      token,
    });
  }

  resendInvite(id: number, token: string) {
    return apiClient(`${this.basePath}/${id}/resend-invite`, {
      method: "POST",
      token,
    });
  }

  acceptInvite(data: AcceptInviteRequest) {
    return apiClient(`${this.basePath}/invite/accept`, {
      method: "POST",
      body: data,
    });
  }

  rejectInvite(data: RejectInviteRequest) {
    return apiClient(`${this.basePath}/invite/reject`, {
      method: "POST",
      body: data,
    });
  }
}

export const staffRepository = new StaffRepository();