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

export const authRepository = {
  login(credentials: TenantStaffLoginRequest, token?: string) {
    return apiClient<TenantStaffLoginResponse>("/api/auth/login", {
      method: "POST",
      body: credentials,
      token,
    });
  },

  getProfile(token: string) {
    return apiClient<TenantStaffProfileResponse>("/api/auth/me", {
      method: "GET",
      token,
    });
  },

  logout(token: string) {
    return apiClient<TenantStaffLogoutResponse>("/api/auth/logout", {
      method: "POST",
      token,
    });
  },

  requestRegistrationLink(credentials: RegisterRequest, token: string) {
    return apiClient<RegisterResponse>("api/auth/magic-link-sent", {
        method: 'POST',
        body: credentials,
        token
    })
  }
  ,
  registerHospital(credentials: HospitalRegistrationRequest, token: string){
    return apiClient<HospitalRegistrationResponse>("api/auth/register-hospital", {
        method: 'POST',
        body: credentials,
        token
    })
  },
  verifyTokenValidity(token: string) {
    return apiClient<VerifyTokenResponse>("api/auth/verify-token", {
        method: 'GET',
        body: token
    })
  },
  
 };
