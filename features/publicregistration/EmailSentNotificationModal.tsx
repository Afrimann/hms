"use client";

import { IoClose } from "react-icons/io5";
import { useRequestRegistrationLink } from "@/lib/hooks/useHospital";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

export default function EmailSentNotificationModal({
  isOpen,
  onClose,
  email,
}: Props) {
  const { mutate, isPending } = useRequestRegistrationLink();

  if (!isOpen) return null;

  function handleResend() {
    mutate({ email });
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

        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="mb-3 text-xl font-bold text-black">
              Verification Link Sent
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              An access link has been sent to the email address provided. Please
              check your inbox and click the link to continue your medical
              facility setup.
            </p>
          </div>

          <a
            href={`mailto:${email}`}
            className="block w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white text-center"
          >
            Open Email
          </a>

          <p className="mt-4 text-center text-sm text-text-muted">
            Didn&apos;t receive the email?{" "}
            <button
              onClick={handleResend}
              disabled={isPending}
              className="font-medium text-orange-500 hover:underline disabled:opacity-60"
            >
              {isPending ? "Resending..." : "Resend Link"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
