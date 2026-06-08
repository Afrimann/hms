"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAcceptInvite } from "@/lib/hooks/useStaff";
import Header from "@/features/onboarding/Header";

type Fields = {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  password_confirmation: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): Errors {
  const e: Errors = {};
  if (!fields.first_name.trim()) e.first_name = "First name is required";
  if (!fields.last_name.trim()) e.last_name = "Last name is required";
  if (!fields.phone.trim()) e.phone = "Phone number is required";
  if (!fields.password) e.password = "Password is required";
  else if (fields.password.length < 8) e.password = "Minimum 8 characters";
  if (!fields.password_confirmation)
    e.password_confirmation = "Please confirm your password";
  else if (fields.password !== fields.password_confirmation)
    e.password_confirmation = "Passwords do not match";
  return e;
}

export default function AcceptInvitePage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";
  const department = params.get("department") ?? "";
  const role = params.get("role") ?? "";

  const { mutate: acceptInvite, isPending } = useAcceptInvite();

  const [fields, setFields] = useState<Fields>({
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [attempted, setAttempted] = useState(false);

  function set(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  const errors: Errors = attempted ? validate(fields) : {};
  const isClean = Object.keys(validate(fields)).length === 0;

  function handleSubmit() {
    setAttempted(true);
    if (!isClean) return;
    acceptInvite(
      { token, ...fields },
      {
        onSuccess: () => {
          toast.success("Account activated! You can now sign in.");
          router.replace("/login");
        },
        onError: (err) =>
          toast.error(err.message || "Something went wrong. Please try again."),
      }
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header />

      <div className="w-full max-w-lg px-4 py-12">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Accept Your Invitation
          </h1>
          <p className="mt-1 text-sm text-[#595959]">
            Complete your profile to activate your account
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Name row */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-[#595959] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g., Abiodun Oluwapelumi Amos"
              value={fields.first_name}
              onChange={(e) => set("first_name", e.target.value)}
              className={`w-full border rounded-[10px] px-3 py-2.5 text-sm text-gray-800 placeholder:text-[#BFBFBF] outline-none transition-colors
                  ${errors.first_name ? "border-red-400 bg-red-50/20" : "border-[#BFBFBF] focus:border-[#2E4EEA] focus:ring-2 focus:ring-[#2E4EEA]/10"}`}
            />
            {errors.first_name && (
              <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>
            )}
          </div>
          {/* Email (locked) */}
          <div>
            <label className="block text-xs font-medium text-[#595959] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                disabled
                className="w-full border border-[#BFBFBF] rounded-[10px] px-3 py-2.5 pr-10 text-sm text-gray-500 bg-[#F5F5F5] outline-none cursor-not-allowed"
              />
              <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000]" />
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#595959] mb-1.5">
                Department
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., Cardiology"
                  value={department}
                  disabled
                  className="w-full border border-[#BFBFBF] rounded-[10px] px-3 py-2.5 pr-10 text-sm text-gray-500 bg-[#F5F5F5] outline-none cursor-not-allowed"
                />
                <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000]" />

              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#595959] mb-1.5">
                Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., Cardiology"
                  value={role}
                  disabled
                  className="w-full border border-[#BFBFBF] rounded-[10px] px-3 py-2.5 pr-10 text-sm text-gray-500 bg-[#F5F5F5] outline-none cursor-not-allowed"
                />
                <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000]" />
              </div>
            </div>
          </div>
          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-[#595959] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g., +2348012345678"
              value={fields.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={`w-full border rounded-[10px] px-3 py-2.5 text-sm text-gray-800 placeholder:text-[#BFBFBF] outline-none transition-colors
                ${errors.phone ? "border-red-400 bg-red-50/20" : "border-[#BFBFBF] focus:border-[#2E4EEA] focus:ring-2 focus:ring-[#2E4EEA]/10"}`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-[#595959] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={fields.password}
                onChange={(e) => set("password", e.target.value)}
                className={`w-full border rounded-[10px] px-3 py-2.5 pr-10 text-sm text-gray-800 placeholder:text-[#BFBFBF] outline-none transition-colors
                  ${errors.password ? "border-red-400 bg-red-50/20" : "border-[#BFBFBF] focus:border-[#2E4EEA] focus:ring-2 focus:ring-[#2E4EEA]/10"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#595959] hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-xs font-medium text-[#595959] mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                value={fields.password_confirmation}
                onChange={(e) => set("password_confirmation", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className={`w-full border rounded-[10px] px-3 py-2.5 pr-10 text-sm text-gray-800 placeholder:text-[#BFBFBF] outline-none transition-colors
                  ${errors.password_confirmation ? "border-red-400 bg-red-50/20" : "border-[#BFBFBF] focus:border-[#2E4EEA] focus:ring-2 focus:ring-[#2E4EEA]/10"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#595959] hover:text-gray-700"
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password_confirmation}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className={`mt-6 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200
            ${isClean && !isPending
              ? "bg-[#2E4EEA] hover:bg-[#2340cc] text-white shadow-lg shadow-[#2E4EEA]/25"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
              </svg>
              Activating account…
            </span>
          ) : (
            "Save & Continue To Hospital Info"
          )}
        </button>
      </div>

      <p className="mb-8 text-xs text-[#595959]">
        &copy; {new Date().getFullYear()} PHMS. All rights reserved.
      </p>
    </div>
  );
}
