export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// Central Registration Types
export type RegisterRequest = {
  email: string;
};
export type RegisterResponse = ApiResponse<{
  email: string;
  expires_at: string;
}>;

export type VerifyTokenResponse = ApiResponse<{
  email: string;
  expires_at: string;
}>;

export type HospitalRegistrationRequest = {
  token: string;
  hospital_name: string;
  hospital_email: string;
  hospital_address: string;
  hospital_phone: string;
  slug: string;
  admin_fullname: string;
  admin_email: string;
  admin_phone: string;
  password: string;
  password_confirmation: string;
  plan_id: number;
  billing_cycle: "monthly" | "yearly";
};

export type HospitalRegistrationResponse = ApiResponse<{
  tenant_id: string;
  tenant_slug: string;
  domain: string;
  subscription_status: string;
  trial_ends_at: string;
}>;

// Shared sub-types
export type TenantPermission = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
};

export type TenantRole = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
  permissions: TenantPermission[];
};

export type TenantUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  email_verified_at: string;
  is_active: boolean;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
  roles: TenantRole[];
  permissions: string[];
};

// Tenant Auth Types
export type TenantStaffLoginRequest = {
  email: string;
  password: string;
};

export type TenantStaffLoginResponse = ApiResponse<{
  message: string;
  token: string;
  user: TenantUser;
  roles: string[];
  permissions: string[];
}>;

export type PlanFeature = {
  id: number;
  plan_id: number;
  feature_key: string;
  feature_name: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type TenantStaffProfileResponse = ApiResponse<{
  user: TenantUser;
  roles: string[];
  permissions: TenantPermission[];
  hospital: {
    id: number;
    hospital_name: string;
    hospital_email: string;
    hospital_phone: string;
    hospital_address: string;
    created_at: string;
    updated_at: string;
  };
  subscription: {
    status: string;
    trial_ends_at: string | null;
    ends_at: string | null;
  };
  plan: {
    id: number;
    name: string;
    slug: string;
    price: string;
    trial_days: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    features: PlanFeature[];
  };
  features: string[];
}>;

export type TenantStaffLogoutResponse = ApiResponse<{
  message: string;
}>;

export type TenantFeatureAccessRequest = { 
  feature: string[]
}

export type TenantFeatureAccessResponse = ApiResponse<Record<string, boolean>>;