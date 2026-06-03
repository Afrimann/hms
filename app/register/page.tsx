"use client";

import { useState } from "react";
import SendEmailModal from "@/features/publicregistration/SendEmailModal";
import EmailSentNotificationModal from "@/features/publicregistration/EmailSentNotificationModal";

export default function Register() {
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");

  function handleEmailSuccess(email: string) {
    setRegistrationEmail(email);
    setShowSendEmail(false);
    setShowEmailSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => setShowSendEmail(true)}
        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white"
      >
        Register Your Hospital
      </button>

      <SendEmailModal
        isOpen={showSendEmail}
        onClose={() => setShowSendEmail(false)}
        onSuccess={handleEmailSuccess}
      />

      <EmailSentNotificationModal
        isOpen={showEmailSent}
        onClose={() => setShowEmailSent(false)}
        email={registrationEmail}
      />
    </div>
  );
}
