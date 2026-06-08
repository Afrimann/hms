import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | PHMS",
};

const FAQS = [
  {
    q: "How do I get my registration link?",
    a: "Visit the Register page, enter your work email address, and we will send you a secure one-time registration link. The link expires after 24 hours.",
  },
  {
    q: "My registration link has expired. What do I do?",
    a: "Return to the Register page and request a new link using the same email address. Each new request invalidates any previously issued links.",
  },
  {
    q: "Can I change my subscription plan after registering?",
    a: "Yes. Log in to your hospital workspace, navigate to Settings → Billing, and select a new plan. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "How do I add departments or staff members?",
    a: "After logging into your workspace, use the Departments and Staff modules in the sidebar. You can create departments first, then assign staff members to them.",
  },
  {
    q: "Is our patient data secure?",
    a: "Yes. All data is encrypted at rest and in transit. We maintain HIPAA-compatible safeguards and can provide a Business Associate Agreement (BAA) on request.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Go to Settings → Billing → Cancel Subscription. Your workspace remains active until the end of the current billing period, and your data is retained for 90 days after cancellation.",
  },
];

const CHANNELS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email Support",
    value: "support@phms.tech",
    detail: "Response within 24 hours on business days",
    href: "mailto:support@phms.tech",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: "Phone Support",
    value: "+234 800 PHMS HQ",
    detail: "Monday – Friday, 8am – 6pm WAT",
    href: "tel:+2348002769646",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    label: "Live Chat",
    value: "In-app chat widget",
    detail: "Available from your hospital workspace dashboard",
    href: null,
  },
];

export default function SupportPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
          Support
        </h1>
        <p className="text-sm text-text-muted">
          We&apos;re here to help you get the most out of PHMS.
        </p>
      </div>

      {/* Contact channels */}
      <section className="mb-14">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Get in Touch</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CHANNELS.map((ch) => (
            <div
              key={ch.label}
              className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 bg-gray-50/60"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {ch.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{ch.label}</p>
                {ch.href ? (
                  <a
                    href={ch.href}
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {ch.value}
                  </a>
                ) : (
                  <p className="text-sm text-primary">{ch.value}</p>
                )}
                <p className="text-xs text-text-muted mt-1">{ch.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-5">
          {FAQS.map((faq) => (
            <div key={faq.q} className="border-b border-gray-100 pb-5 last:border-none last:pb-0">
              <p className="text-sm font-medium text-gray-900 mb-1">{faq.q}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal links */}
      <section className="pt-8 border-t border-gray-100">
        <p className="text-xs text-text-muted">
          Looking for our policies?{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{" "}
          &middot;{" "}
          <Link href="/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </Link>
        </p>
      </section>
    </main>
  );
}
