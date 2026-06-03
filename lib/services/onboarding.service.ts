import { HospitalRegistrationRequest } from "@/types/auth.type";
import { authRepository } from "../repositories/auth.repository";

export const onboardingService = {
  completeRegistration: (data: HospitalRegistrationRequest) => {
    return authRepository.registerHospital(data);
  },
};