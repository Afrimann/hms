import { HospitalRegistrationRequest, RegisterRequest } from "@/types/auth.type";
import { authService } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useHospitalRegistration = () => {
  return useMutation({
    mutationFn: (data: HospitalRegistrationRequest) =>
      authService.registerHospital(data),
  });
};

export const useRequestRegistrationLink = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      authService.requestRegistrationLink(data),
  });
};
