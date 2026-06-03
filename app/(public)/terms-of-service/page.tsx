import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CrownHealth",
};

const LAST_UPDATED = "May 29, 2026";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By registering a hospital workspace or accessing any part of the CrownHealth platform, you agree to be bound by these Terms of Service. If you are registering on behalf of an organisation, you represent that you have the authority to bind that organisation to these terms.`,
  },
  {
    title: "2. Description of Service",
    content: `CrownHealth provides a cloud-based hospital management system including department management, staff administration, patient record workflows, billing, and subscription management tools. Features available to you depend on your chosen subscription plan.`,
  },
  {
    title: "3. Account Registration",
    content: `You must complete the registration process accurately and keep your credentials secure. You are responsible for all activity that occurs under your account. Notify us immediately at security@crownhealth.io if you suspect unauthorised access to your workspace.`,
  },
  {
    title: "4. Subscriptions & Billing",
    content: `Subscriptions are billed on a monthly or annual basis as selected at registration. Fees are non-refundable except where required by law. We reserve the right to modify pricing with 30 days' written notice. Failure to pay may result in suspension of your workspace after a 7-day grace period.`,
  },
  {
    title: "5. Acceptable Use",
    content: `You agree not to use the platform to store unlawfully obtained data, attempt to gain unauthorised access to other workspaces, reverse-engineer or decompile any part of the service, transmit malware or harmful code, or violate any applicable law including healthcare data regulations in your jurisdiction.`,
  },
  {
    title: "6. Intellectual Property",
    content: `CrownHealth and its licensors retain all rights to the platform, software, and documentation. These terms do not transfer any intellectual property rights to you. Your hospital data remains your property; we claim no ownership over data you input into the platform.`,
  },
  {
    title: "7. Uptime & Service Level",
    content: `We target 99.5% monthly uptime for core platform services. Scheduled maintenance windows will be communicated at least 48 hours in advance. Downtime caused by factors outside our reasonable control (force majeure, third-party infrastructure failures) is excluded from SLA calculations.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by law, CrownHealth shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability to you in any calendar month shall not exceed the fees you paid to us in that month.`,
  },
  {
    title: "9. Termination",
    content: `Either party may terminate the subscription at any time. Upon termination, your workspace will be deactivated and your data will be retained for 90 days before permanent deletion. We may suspend or terminate your account immediately if we determine you have violated these terms.`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.`,
  },
  {
    title: "11. Changes to Terms",
    content: `We may revise these Terms at any time. We will provide at least 30 days' notice of material changes via email or in-app notification. Continued use of the platform after the effective date constitutes acceptance of the revised Terms.`,
  },
  {
    title: "12. Contact",
    content: `For questions about these Terms, contact us at:\n\nEmail: legal@crownhealth.io\nAddress: CrownHealth Technologies Ltd., 14 Innovation Drive, Lagos, Nigeria.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-text-muted">Last updated: {LAST_UPDATED}</p>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-10">
        Please read these Terms of Service carefully before using the CrownHealth
        platform. These terms form a legally binding agreement between you (or the
        organisation you represent) and CrownHealth Technologies Ltd.
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
