import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { staffService } from "@/lib/services/staff.service";
import {
  AcceptInviteRequest,
  CreateStaffRequest,
  RejectInviteRequest,
} from "@/types/staff.type";

export const useStaff = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["staff"],
    queryFn: () => staffService.getAllStaff(),
    enabled: !!token,
  });
};

export const useStaffById = (id: number) => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => staffService.getStaffById(id),
    enabled: !!token,
  });
};

export const useCreateStaff = () => {
  return useMutation({
    mutationFn: (data: CreateStaffRequest) => staffService.createStaff(data),
  });
};

export const useDeactivateStaff = () => {
  return useMutation({
    mutationFn: (id: number) => staffService.deactivateStaff(id),
  });
};

export const useReactivateStaff = () => {
  return useMutation({
    mutationFn: (id: number) => staffService.reactivateStaff(id),
  });
};

export const useResendInvite = () => {
  return useMutation({
    mutationFn: (id: number) => staffService.resendInvite(id),
  });
};

export const useAcceptInvite = () => {
  return useMutation({
    mutationFn: (data: AcceptInviteRequest) => staffService.acceptInvite(data),
  });
};

export const useRejectInvite = () => {
  return useMutation({
    mutationFn: (data: RejectInviteRequest) => staffService.rejectInvite(data),
  });
};
