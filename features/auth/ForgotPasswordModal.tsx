"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";
import { useForgotPassword } from "@/lib/hooks/useAuth";

interface Props {
  onClose: () => void;
}

export default function ForgotPasswordModal({ onClose }: Props) {
  const { mutate, isPending } = useForgotPassword();
  const [email, setEmail] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function getEmailError() {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
    return null;
  }

  function handleSubmit() {
    setAttempted(true);
    if (getEmailError()) return;
    mutate(
      { email },
      {
        onSuccess: () => setSubmitted(true),
        onError: (err) =>
          toast.error(err.message || "Something went wrong. Please try again."),
      },
    );
  }

  const emailError = attempted ? getEmailError() : null;
  const isValid = !getEmailError();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg min-h-[350px] flex flex-col justify-center bg-white rounded-2xl shadow-xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoClose size={18} />
        </button>

        {!submitted ? (
          <div className="px-8 py-8">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Reset Your Password
              </h2>
              <p className="mt-1.5 text-sm text-text-muted">
                Enter your official email to receive a secure recovery link.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-800">
                Work/Corporate Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="e.g., director@yourhospital.com"
                autoFocus
                className={`w-full px-4 py-3 rounded-[10px] border text-sm outline-none transition-all duration-200
                  bg-white text-gray-900 placeholder:text-gray-400
                  ${
                    emailError
                      ? "border-red-400 focus:border-red-500 bg-red-50/20"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  }`}
              />
              {emailError && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span>&#9679;</span> {emailError}
                </p>
              )}
            </div>

            <div
              onClick={!isPending ? handleSubmit : undefined}
              className={`mt-5 w-full py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 select-none
                ${
                  isValid && !isPending
                    ? "bg-primary text-white cursor-pointer hover:opacity-90 shadow-md shadow-primary/25"
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
                  Sending...
                </span>
              ) : (
                "Send Password Reset Link"
              )}
            </div>
          </div>
        ) : (
          <div className="px-8 py-8">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Reset Link Sent
              </h2>
              <p className="mt-1.5 text-sm text-text-muted leading-relaxed">
                A secure access link has been sent to your email. Please check
                your inbox and follow the instructions to reset your password.
              </p>
            </div>

            <a
              href={`mailto:${email}`}
              className="block w-full py-3 rounded-xl text-sm font-semibold text-white text-center bg-primary hover:opacity-90 shadow-md shadow-primary/25 transition-all duration-200"
            >
              Open Email
            </a>

            <p className="mt-4 text-center text-xs text-text-muted">
              Didn&apos;t receive the email?{" "}
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAttempted(false);
                  setEmail("");
                }}
                className="font-medium text-orange-500 hover:underline"
              >
                Resend Link
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
