"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/lib/services/auth.service";
import { useAuthStore } from "@/lib/store/auth.store";
import type { TenantStaffLoginRequest, ForgotPasswordRequest, ResetPasswordRequest } from "@/types/auth.type";

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: TenantStaffLoginRequest) =>
      authService.login(credentials),
  });
}

export function useProfile() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: () => authService.getProfile(),
    enabled: !!token,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      authService.resetPassword(data),
  });
}