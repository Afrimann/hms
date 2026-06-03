"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRequestRegistrationLink } from "@/lib/hooks/useHospital";
import { toast } from "sonner";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
};

export default function SendEmailModal({ isOpen, onClose, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useRequestRegistrationLink();


  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Requesting registration link for email:", email);
    mutate(
      { email },
      {
        onSuccess() {
          onSuccess(email);
          toast.success('Registration link sent successfully!');
        },
        onError(error) {
          console.error("Failed to send registration link:", error);
        }
      }
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-[10px] bg-gray-50 px-10 py-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <IoClose size={18} />
        </button>

        <div className="mb-6 text-center">
          <h2 className="mb-3 text-xl font-bold text-black">
            Verify Your Medical Facility Email
          </h2>
          <p className="text-sm leading-relaxed text-text-muted">
            To maintain strict medical data governance, we must verify your
            official email before setting up your secure hosting database
            environment. This ensures all administrative actions are tied to a
            verified hospital corporate identity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-black">
              Work/Corporate Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., director@yourhospital.com"
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-black placeholder:text-gray-400 outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isPending ? "Sending..." : "Send Access Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
