import { authRepository } from "@/lib/repositories/auth.repository";
import { useAuthStore } from "@/lib/store/auth.store";
import type {
  HospitalRegistrationRequest,
  RegisterRequest,
  TenantStaffLoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types/auth.type";

export const authService = {
  async login(credentials: TenantStaffLoginRequest) {
    const data = await authRepository.login(credentials);
    useAuthStore.getState().setSession({
      token: data.data.token,
      user: data.data.user,
      roles: data.data.roles,
      permissions: data.data.permissions,
    });
    return data;
  },

  async getProfile() {
    const token = useAuthStore.getState().token!;
    const data = await authRepository.getProfile(token);
    useAuthStore.getState().setProfile(data.data);
    return data;
  },

  async logout() {
    const token = useAuthStore.getState().token!;
    const data = await authRepository.logout(token);
    useAuthStore.getState().clearSession();
    return data;
  },

  requestRegistrationLink(data: RegisterRequest) {
    return authRepository.requestRegistrationLink(data);
  },

  registerHospital(data: HospitalRegistrationRequest) {
    return authRepository.registerHospital(data);
  },

  verifyToken(token: string) {
    return authRepository.verifyTokenValidity(token);
  },

  forgotPassword(data: ForgotPasswordRequest) {
    return authRepository.forgotPassword(data);
  },

  resetPassword(data: ResetPasswordRequest) {
    return authRepository.resetPassword(data);
  },
};
