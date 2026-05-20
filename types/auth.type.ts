export type RegisterRequest = {
  email: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
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
  registration_token: {
    id: number;
    email: string;
    token: string;
    expires_at: string;
    used_at: string | null;
    created_at: string;
    updated_at: string;
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
  };
}>;
