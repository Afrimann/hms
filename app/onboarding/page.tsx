import { Suspense } from "react";
import MultiStepForm from "@/features/onboarding/MultiStepForm";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50/60">
      <Suspense>
        <MultiStepForm />
      </Suspense>
    </div>
  );
}
