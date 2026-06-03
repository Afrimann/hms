"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TenantUser, TenantPermission, PlanFeature } from "@/types/auth.type";

type Hospital = {
  id: number;
  hospital_name: string;
  hospital_email: string;
  hospital_phone: string;
  hospital_address: string;
  created_at: string;
  updated_at: string;
};

type Subscription = {
  status: string;
  trial_ends_at: string | null;
  ends_at: string | null;
};

type Plan = {
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

type AuthState = {
  token: string | null;
  user: TenantUser | null;
  roles: string[];
  permissions: string[];
  hospital: Hospital | null;
  subscription: Subscription | null;
  plan: Plan | null;
  features: string[];
};

type AuthActions = {
  setSession: (data: {
    token: string;
    user: TenantUser;
    roles: string[];
    permissions: string[];
  }) => void;
  setProfile: (data: {
    user: TenantUser;
    roles: string[];
    permissions: TenantPermission[];
    hospital: Hospital;
    subscription: Subscription;
    plan: Plan;
    features: string[];
  }) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  roles: [],
  permissions: [],
  hospital: null,
  subscription: null,
  plan: null,
  features: [],
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSession({ token, user, roles, permissions }) {
        set({ token, user, roles, permissions });
      },

      setProfile({ user, roles, permissions, hospital, subscription, plan, features }) {
        set({
          user,
          roles,
          permissions: permissions.map((p) => p.name),
          hospital,
          subscription,
          plan,
          features,
        });
      },

      clearSession() {
        set(initialState);
      },

      isAuthenticated() {
        return !!get().token;
      },

      hasPermission(permission) {
        return get().permissions.includes(permission);
      },

      hasRole(role) {
        return get().roles.includes(role);
      },
    }),
    {
      name: "hms-auth",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      // Only persist the raw data, not the action functions
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        roles: state.roles,
        permissions: state.permissions,
        hospital: state.hospital,
        subscription: state.subscription,
        plan: state.plan,
        features: state.features,
      }),
    }
  )
);
