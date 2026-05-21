"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authRepository } from "@/lib/repositories/auth.repository";
import { useAuthStore } from "@/lib/store/auth.store";
import type {
  HospitalRegistrationRequest,
  RegisterRequest,
  TenantStaffLoginRequest,
} from "@/types/auth.type";

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (credentials: TenantStaffLoginRequest) =>
      authRepository.login(credentials),
    onSuccess(data) {
      setSession({
        token: data.data.token,
        user: data.data.user,
        roles: data.data.roles,
        permissions: data.data.permissions,
      });
    },
  });
}

export function useProfile() {
  const token = useAuthStore((s) => s.token);
  const setProfile = useAuthStore((s) => s.setProfile);

  const query = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: () => authRepository.getProfile(token!),
    enabled: !!token,
  });

  useEffect(() => {
    if (query.data) {
      setProfile(query.data.data);
    }
  }, [query.data, setProfile]);

  return query;
}

export function useLogout() {
  const token = useAuthStore((s) => s.token);
  const clearSession = useAuthStore((s) => s.clearSession);

  return useMutation({
    mutationFn: () => authRepository.logout(token!),
    onSuccess() {
      clearSession();
    },
  });
}

export function useRequestRegLink() {
  return useMutation({
    mutationFn: (credentials: RegisterRequest) =>
      authRepository.requestRegistrationLink(credentials, ""),
  });
}

export function useHospitalRegistration() {
  return useMutation({
    mutationFn: (credentials: HospitalRegistrationRequest) =>
      authRepository.registerHospital(credentials, ""),
  });
}
