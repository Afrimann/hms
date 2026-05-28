import { apiClient } from "@/lib/api-client";
import type {
  TenantStaffLoginRequest,
  TenantStaffLoginResponse,
  TenantStaffProfileResponse,
  TenantStaffLogoutResponse,
  HospitalRegistrationResponse,
  HospitalRegistrationRequest,
  RegisterRequest,
  RegisterResponse,
  VerifyTokenResponse,
} from "@/types/auth.type";

class AuthRepository {
  private readonly basePath = "/api/auth";
  private readonly registerPath = "/api/register";

  requestRegistrationLink(credentials: RegisterRequest) {
    return apiClient<RegisterResponse>(`${this.registerPath}/request-link`, {
      method: "POST",
      body: credentials,
    });
  }

  registerHospital(credentials: HospitalRegistrationRequest) {
    return apiClient<HospitalRegistrationResponse>(`${this.registerPath}/complete`, {
      method: "POST",
      body: credentials,
    });
  }

  verifyTokenValidity(token: string) {
    return apiClient<VerifyTokenResponse>(`${this.registerPath}/verify-token`, {
      method: "GET",
      body: token,
    });
  }

  login(credentials: TenantStaffLoginRequest, token?: string) {
    return apiClient<TenantStaffLoginResponse>(`${this.basePath}/login`, {
      method: "POST",
      body: credentials,
      token,
    });
  }

  getProfile(token: string) {
    return apiClient<TenantStaffProfileResponse>(`${this.basePath}/me`, {
      method: "GET",
      token,
    });
  }

  logout(token: string) {
    return apiClient<TenantStaffLogoutResponse>(`${this.basePath}/logout`, {
      method: "POST",
      token,
    });
  }
}

export const authRepository = new AuthRepository();