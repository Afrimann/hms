"use client";

import { useState } from "react";

const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    price: "₦0",
    period: "/month",
    description:
      "This is your product-led growth hook. It allows small clinics or newly registered facilities to experience the software for free.",
    features: [
      "Maximum of 3 Active Staff Account",
      "50 Patient records",
    ],
    badge: null,
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: "₦60,000",
    period: "/month",
    description:
      "Designed for established private practices, single-specialty clinics, and mid-sized outpatient facilities.",
    features: [
      "Maximum of 15 Active Staff Account",
      "Unlimited Active Patient records",
      "Departmental routing",
      "Analytics Dashboard for Admin",
    ],
    badge: "Recommended",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "₦130,000",
    period: "/month",
    description:
      "Designed for multi-department hospitals, multi-clinic chains managing heavy clinical, laboratory, and pharmacy traffic.",
    features: [
      "Unlimited Active Staff Account",
      "Unlimited Active Patient records",
      "Departmental routing",
      "Analytics Dashboard for Admin",
    ],
    badge: null,
  },
];

type Props = {
  errors: { plan?: string };
  onSelectPlan: (planId: string) => void;
  onBack: () => void;
  isSubmitting: boolean;
};

export default function ChoosePlanStep({
  errors,
  onSelectPlan,
  onBack,
  isSubmitting,
}: Props) {
  const [activePlanId, setActivePlanId] = useState<string | null>(null);

  function handleSelect(planId: string) {
    if (isSubmitting) return;
    setActivePlanId(planId);
    onSelectPlan(planId);
  }

  return (
    <div className="flex flex-col px-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Select Your Subscription Plan
        </h1>
        <p className="text-text-muted text-sm mt-2">
          Scale your medical infrastructure with precision-engineered tooling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className="relative flex flex-col rounded-2xl border border-gray-200 bg-white"
          >
            {plan.badge && (
              <div className="absolute top-4 right-4">
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-base font-semibold text-gray-600">
                {plan.name}
              </h3>

              <div className="mt-1.5 mb-4">
                <span className="text-4xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-sm text-text-muted ml-1">
                  {plan.period}
                </span>
              </div>

              <p className="text-sm text-text-muted leading-relaxed mb-5">
                {plan.description}
              </p>

              <button
                onClick={() => handleSelect(plan.id)}
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-6
                  ${
                    isSubmitting && activePlanId === plan.id
                      ? "bg-primary text-white cursor-not-allowed opacity-80"
                      : isSubmitting
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-primary text-white cursor-pointer hover:opacity-90 shadow-md shadow-primary/20"
                  }`}
              >
                {isSubmitting && activePlanId === plan.id ? (
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
                    Processing...
                  </span>
                ) : (
                  "Select Plan"
                )}
              </button>

              <ul className="flex flex-col gap-3 mt-auto">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 text-primary shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {errors.plan && (
        <p className="text-xs text-red-500 text-center mt-4 flex items-center justify-center gap-1">
          <span>&#9679;</span> {errors.plan}
        </p>
      )}

      <p className="text-center text-sm text-amber-600 font-medium mt-8">
        7-Day Free Trial Activated on each plan. Cancel anytime before Day 7
        from your Membership settings to prevent billing.
      </p>

      <div className="flex justify-center mt-6">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-gray-700 transition-colors disabled:opacity-50"
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
          Back to Hospital Info
        </button>
      </div>
    </div>
  );
}
