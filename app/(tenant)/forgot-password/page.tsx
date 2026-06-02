"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useForgotPassword } from "@/lib/hooks/useAuth";

export default function ForgotPasswordPage() {
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Check your inbox
          </h1>
          <p className="mt-2 text-sm text-text-muted leading-relaxed">
            If{" "}
            <span className="font-medium text-gray-700">{email} </span> is
            registered, you&apos;ll receive a password reset link shortly.
          </p>

          <p className="mt-6 text-xs text-text-muted">
            Didn&apos;t receive an email?{" "}
            <button
              onClick={() => {
                setSubmitted(false);
                setAttempted(false);
              }}
              className="text-primary hover:underline font-medium"
            >
              Try again
            </button>
          </p>

          <Link
            href="/login"
            className="mt-6 flex items-center justify-center gap-1.5 text-sm text-text-muted hover:text-gray-700 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to sign in
          </Link>
        </div>

        <p className="mt-6 text-xs text-text-muted">
          &copy; {new Date().getFullYear()} CrownHealth Technologies Ltd.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="mb-8 text-center">
          <span className="font-bold text-sm tracking-widest uppercase text-primary">
            CrownHealth
          </span>
          <h1 className="mt-3 text-2xl font-bold text-gray-900 tracking-tight">
            Forgot your password?
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

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
          className={`mt-6 w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 select-none
            ${
              isValid && !isPending
                ? "bg-primary text-white cursor-pointer hover:opacity-90 shadow-lg shadow-primary/25"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
              Sending link...
            </span>
          ) : (
            "Send Reset Link"
          )}
        </div>

        <Link
          href="/login"
          className="mt-5 flex items-center justify-center gap-1.5 text-sm text-text-muted hover:text-gray-700 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to sign in
        </Link>
      </div>

      <p className="mt-6 text-xs text-text-muted">
        &copy; {new Date().getFullYear()} CrownHealth Technologies Ltd.
      </p>
    </div>
  );
}
