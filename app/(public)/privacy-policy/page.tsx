import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CrownHealth",
};

const LAST_UPDATED = "May 29, 2026";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly when registering your hospital, including administrator names, email addresses, phone numbers, and facility details. We also collect technical usage data such as login timestamps, feature interactions, and system logs to maintain service performance.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to provision and maintain your hospital workspace, process billing and subscription payments, send administrative notifications and security alerts, provide customer support, and improve our platform. We do not sell your personal or institutional data to third parties.`,
  },
  {
    title: "3. Healthcare Data & HIPAA",
    content: `CrownHealth is designed to support healthcare operations. We treat all patient-related data processed through our platform as Protected Health Information (PHI) under HIPAA. We maintain appropriate technical and administrative safeguards, and we enter into a Business Associate Agreement (BAA) with all healthcare customers upon request.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, multi-factor authentication, and regular third-party security audits. Access to your data is restricted to authorised personnel only and logged for audit purposes.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your account data for as long as your subscription is active. Upon cancellation, your data is retained for 90 days to allow for reactivation or export, after which it is permanently deleted from our systems unless legal obligations require otherwise.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to access, correct, or delete the personal data we hold about your organisation. You may request a data export at any time from your account dashboard. For erasure requests or data portability inquiries, contact our Data Protection Officer at privacy@crownhealth.io.`,
  },
  {
    title: "7. Cookies",
    content: `We use strictly necessary cookies to maintain your session and authentication state. We do not use tracking or advertising cookies. You may disable non-essential cookies in your browser settings without affecting core platform functionality.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes via email or in-app notification at least 30 days before they take effect. Continued use of the platform after changes constitutes acceptance.`,
  },
  {
    title: "9. Contact Us",
    content: `For any questions regarding this Privacy Policy or our data practices, please contact us at:\n\nEmail: privacy@crownhealth.io\nAddress: CrownHealth Technologies Ltd., 14 Innovation Drive, Lagos, Nigeria.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-text-muted">Last updated: {LAST_UPDATED}</p>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-10">
        CrownHealth Technologies Ltd. (&quot;CrownHealth&quot;, &quot;we&quot;, &quot;our&quot;) operates a
        cloud-based hospital management platform. This Privacy Policy explains how we
        collect, use, store, and protect information about you and your organisation
        when you use our services.
      </p>

      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              {section.title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 text-xs text-text-muted">
        &copy; {new Date().getFullYear()} CrownHealth Technologies Ltd. All rights reserved.
      </div>
    </main>
  );
}
