import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../repositories/auth.repository";
import { TenantStaffLoginRequest } from "@/types/auth.type";

export const useTenantLogin = () => {
  return useMutation({
    mutationFn: (credentials: TenantStaffLoginRequest) => {
      return authRepository.login(credentials);
    },
  });
};
