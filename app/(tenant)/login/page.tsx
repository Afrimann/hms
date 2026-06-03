"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLogin } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/store/auth.store";
import ForgotPasswordModal from "@/features/auth/ForgotPasswordModal";

function getTenantDisplayName(): string {
  if (typeof window === "undefined") return "Your Workspace";
  const slug = window.location.hostname.split(".")[0];
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function TenantLoginPage() {
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const hasRole = useAuthStore((s) => s.hasRole);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [attempted, setAttempted] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    setTenantName(getTenantDisplayName());
  }, []);

  function validate() {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  }

  function handleSubmit() {
    setAttempted(true);
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!");
          const destination = hasRole("hospital_admin")
            ? "/admin-workspace/dashboard"
            : "/dashboard";
          router.replace(destination);
        },
        onError: (err) =>
          toast.error(err.message || "Invalid credentials. Please try again."),
      },
    );
  }

  const currentErrors = attempted ? validate() : {};
  const isValid = Object.keys(validate()).length === 0;

  return (
    <>
      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        {/* Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Branding */}
          <div className="mb-8 text-center">
            <span className="font-bold text-sm tracking-widest uppercase text-primary">
              CrownHealth
            </span>
            <h1 className="mt-3 text-2xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              Sign in to{" "}
              <span className="font-medium text-gray-700">{tenantName}</span>
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="e.g., admin@yourhospital.com"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200
                bg-white text-gray-900 placeholder:text-gray-400
                ${
                  currentErrors.email
                    ? "border-red-400 focus:border-red-500 bg-red-50/20"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                }`}
              />
              {currentErrors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span>&#9679;</span> {currentErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-800">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition-all duration-200
                  bg-white text-gray-900 placeholder:text-gray-400
                  ${
                    currentErrors.password
                      ? "border-red-400 focus:border-red-500 bg-red-50/20"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  }`}
                />
                <div
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {currentErrors.password && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span>&#9679;</span> {currentErrors.password}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div
            onClick={!isPending ? handleSubmit : undefined}
            className={`mt-6 w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 select-none
            ${
              isValid && !isPending
                ? "bg-primary text-white cursor-pointer hover:opacity-90 shadow-lg shadow-primary/25"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-text-muted">
          &copy; {new Date().getFullYear()} CrownHealth Technologies Ltd.
        </p>
      </div>
    </>
  );
}
