import type { FormData } from "./MultiStepForm";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "$49",
    period: "/month",
    description: "Perfect for small clinics and independent practices.",
    features: [
      "Up to 5 departments",
      "50 staff accounts",
      "Basic reporting & analytics",
      "Email support",
    ],
    badge: null,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "Built for growing medical facilities.",
    features: [
      "Up to 20 departments",
      "200 staff accounts",
      "Advanced analytics dashboard",
      "Priority email & phone support",
    ],
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large hospitals with complex operations.",
    features: [
      "Unlimited departments",
      "Unlimited staff accounts",
      "Custom integrations & API access",
      "24/7 dedicated account support",
    ],
    badge: null,
  },
];

type Props = {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  errors: { plan?: string };
};

export default function ChoosePlanStep({ formData, updateField, errors }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Select Your Subscription Plan
        </h1>
        <p className="text-text-muted text-sm mt-2">
          Scale your medical infrastructure with precision-engineered tooling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const isSelected = formData.plan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => updateField("plan", plan.id)}
              className={`relative flex flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200
                ${isSelected
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{plan.description}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 ml-2 mt-0.5 flex items-center justify-center transition-colors
                    ${isSelected ? "border-primary bg-primary" : "border-gray-300"}`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-sm text-text-muted">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-2.5 mt-auto">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {errors.plan && (
        <p className="text-xs text-red-500 text-center mt-2 flex items-center justify-center gap-1">
          <span>&#9679;</span> {errors.plan}
        </p>
      )}
    </div>
  );
}
