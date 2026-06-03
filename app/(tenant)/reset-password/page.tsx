"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";
import { useResetPassword } from "@/lib/hooks/useAuth";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";
  const emailFromUrl = searchParams.get("email") ?? "";

  const { mutate, isPending } = useResetPassword();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [attempted, setAttempted] = useState(false);

  if (!token || !emailFromUrl) {
    return (
      <div className="relative w-full max-w-sm bg-white rounded-[10px] shadow-xl mx-4 px-8 py-8 text-center">
        <button
          onClick={() => router.replace("/login")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoClose size={18} />
        </button>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Invalid reset link</h1>
        <p className="mt-2 text-sm text-text-muted">
          This password reset link is missing required information. Please request a new one.
        </p>
        <button
          onClick={() => router.replace("/login")}
          className="mt-5 text-sm font-medium text-primary hover:underline"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  function validate() {
    const e: { password?: string; passwordConfirmation?: string } = {};
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Password must be at least 8 characters";
    if (!passwordConfirmation) e.passwordConfirmation = "Please confirm your password";
    else if (password && passwordConfirmation !== password) e.passwordConfirmation = "Passwords do not match";
    return e;
  }

  function handleSubmit() {
    setAttempted(true);
    const e = validate();
    if (Object.keys(e).length > 0) return;

    mutate(
      { email: emailFromUrl, token, password, password_confirmation: passwordConfirmation },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Password reset successfully!");
          router.replace("/login");
        },
        onError: (err) =>
          toast.error(err.message || "Failed to reset password. The link may have expired."),
      },
    );
  }

  const errors = attempted ? validate() : {};
  const isValid = Object.keys(validate()).length === 0;

  return (
    <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl mx-4 px-8 py-8">
      <button
        type="button"
        onClick={() => router.replace("/login")}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <IoClose size={18} />
      </button>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Create New Password</h1>
        <p className="mt-1.5 text-sm text-text-muted">Create new password to restore system access.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* New password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-800">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="At least 8 characters"
              className={`w-full px-4 py-3 pr-11 rounded-[10px] border text-sm outline-none transition-all duration-200
                bg-white text-gray-900 placeholder:text-gray-400
                ${errors.password
                  ? "border-red-400 focus:border-red-500 bg-red-50/20"
                  : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
          {errors.password ? (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span>&#9679;</span> {errors.password}
            </p>
          ) : password.length > 0 && password.length < 8 ? (
            <p className="text-xs text-amber-500 flex items-center gap-1">
              <span>&#9679;</span> {8 - password.length} more character{8 - password.length !== 1 ? "s" : ""} needed
            </p>
          ) : null}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-800">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Re-enter your new password"
              className={`w-full px-4 py-3 pr-11 rounded-[10px] border text-sm outline-none transition-all duration-200
                bg-white text-gray-900 placeholder:text-gray-400
                ${errors.passwordConfirmation
                  ? "border-red-400 focus:border-red-500 bg-red-50/20"
                  : passwordConfirmation.length > 0 && passwordConfirmation === password
                    ? "border-green-400 focus:border-green-500"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <EyeIcon open={showConfirm} />
            </button>
          </div>
          {errors.passwordConfirmation ? (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span>&#9679;</span> {errors.passwordConfirmation}
            </p>
          ) : passwordConfirmation.length > 0 && passwordConfirmation === password ? (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span>&#9679;</span> Passwords match
            </p>
          ) : null}
        </div>
      </div>

      {/* Submit */}
      <div
        onClick={!isPending ? handleSubmit : undefined}
        className={`mt-6 w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 select-none
          ${isValid && !isPending
            ? "bg-primary text-white cursor-pointer hover:opacity-90 shadow-lg shadow-primary/25"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
            </svg>
            Resetting password...
          </span>
        ) : (
          "Submit"
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl mx-4 p-8 flex justify-center">
            <svg className="w-6 h-6 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
            </svg>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
