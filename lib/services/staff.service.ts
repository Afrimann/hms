import { staffRepository } from "@/lib/repositories/staff.repository";
import { useAuthStore } from "@/lib/store/auth.store";
import type {
  AcceptInviteRequest,
  CreateStaffRequest,
  RejectInviteRequest,
} from "@/types/staff.type";

export const staffService = {
  getAllStaff() {
    const token = useAuthStore.getState().token!;
    return staffRepository.getAllStaff(token);
  },

  getStaffById(id: number) {
    const token = useAuthStore.getState().token!;
    return staffRepository.getStaffById(id, token);
  },

  createStaff(data: CreateStaffRequest) {
    const token = useAuthStore.getState().token!;
    return staffRepository.createNewStaff(data, token);
  },

  deactivateStaff(id: number) {
    const token = useAuthStore.getState().token!;
    return staffRepository.deactivateStaff(id, token);
  },

  reactivateStaff(id: number) {
    const token = useAuthStore.getState().token!;
    return staffRepository.reactivateStaff(id, token);
  },

  resendInvite(id: number) {
    const token = useAuthStore.getState().token!;
    return staffRepository.resendInvite(id, token);
  },

  acceptInvite(data: AcceptInviteRequest) {
    return staffRepository.acceptInvite(data);
  },

  rejectInvite(data: RejectInviteRequest) {
    return staffRepository.rejectInvite(data);
  },

  getAllRoles() {
    const token = useAuthStore.getState().token!;
    return staffRepository.getAllRoles(token);
  },
};
