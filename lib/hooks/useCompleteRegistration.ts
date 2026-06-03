import { HospitalRegistrationRequest } from "@/types/auth.type";
import { onboardingService } from "../services/onboarding.service";
import { useMutation } from "@tanstack/react-query";
export const useCompleteRegistration = () => {
  return useMutation({
    mutationFn: (data: HospitalRegistrationRequest) => onboardingService.completeRegistration(data),
  });
}