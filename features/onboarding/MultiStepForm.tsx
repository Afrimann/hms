"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import StepProgressBar from "./StepProgressBar";
import AdminProfileStep from "./AdminProfileStep";
import HospitalInfoStep from "./HospitalInfoStep";
import ChoosePlanStep from "./ChoosePlanStep";
import NavigationControls from "./NavigationControls";
import { useCompleteRegistration } from "@/lib/hooks/useCompleteRegistration";
import TokenNotFound from "./TokenNotFound";

export type FormData = {
  // Step 1
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Step 2
  hospitalName: string;
  hospitalEmail: string;
  hospitalPhone: string;
  address: string;
  // Step 3
  plan: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  hospitalName: "",
  hospitalEmail: "",
  hospitalPhone: "",
  address: "",
  plan: "",
};

const PLAN_ID_MAP: Record<string, number> = {
  free: 1,
  standard: 2,
  premium: 3,
};

function validateStep(step: number, data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (step === 1) {
    if (!data.fullName.trim()) errors.fullName = "Full name is required";
    if (!data.phone.trim()) errors.phone = "Phone number is required";
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  if (step === 2) {
    if (!data.hospitalName.trim())
      errors.hospitalName = "Hospital name is required";
    if (!data.hospitalEmail.trim()) {
      errors.hospitalEmail = "Hospital email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.hospitalEmail)) {
      errors.hospitalEmail = "Enter a valid email address";
    }
    if (!data.hospitalPhone.trim())
      errors.hospitalPhone = "Hospital phone number is required";
    if (!data.address.trim()) errors.address = "Hospital address is required";
  }

  if (step === 3) {
    if (!data.plan) errors.plan = "Please select a subscription plan";
  }

  return errors;
}

const TOTAL_STEPS = 3;

export default function MultiStepForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_FORM,
    email,
  });
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useCompleteRegistration();

  if (!token) return <TokenNotFound />;

  const currentErrors = showErrors ? validateStep(currentStep, formData) : {};
  const isCurrentStepValid =
    Object.keys(validateStep(currentStep, formData)).length === 0;

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext() {
    const errors = validateStep(currentStep, formData);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (currentStep === TOTAL_STEPS) {
      handleSubmit();
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    setShowErrors(false);
    setCurrentStep((s) => s - 1);
  }

  function handleSubmit() {
    const slug = formData.hospitalName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    mutate(
      {
        token,
        hospital_name: formData.hospitalName,
        hospital_email: formData.hospitalEmail,
        hospital_phone: formData.hospitalPhone,
        hospital_address: formData.address,
        slug,
        admin_fullname: formData.fullName,
        admin_email: email,
        admin_phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        plan_id: PLAN_ID_MAP[formData.plan] ?? 1,
        billing_cycle: "monthly",
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: (err) =>
          toast.error(err.message || "Registration failed. Please try again."),
      },
    );
  }

  function handleSelectPlan(planId: string) {
    const updatedData = { ...formData, plan: planId };
    setFormData(updatedData);

    const slug = updatedData.hospitalName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    mutate(
      {
        token,
        hospital_name: updatedData.hospitalName,
        hospital_email: updatedData.hospitalEmail,
        hospital_phone: updatedData.hospitalPhone,
        hospital_address: updatedData.address,
        slug,
        admin_fullname: updatedData.fullName,
        admin_email: email,
        admin_phone: updatedData.phone,
        password: updatedData.password,
        password_confirmation: updatedData.confirmPassword,
        plan_id: PLAN_ID_MAP[planId] ?? 1,
        billing_cycle: "monthly",
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: (err) =>
          toast.error(err.message || "Registration failed. Please try again."),
      },
    );
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary"
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
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Registration Complete!
        </h2>
        <p className="text-text-muted text-sm max-w-sm">
          Your hospital workspace has been created. Check your email to verify
          your account and get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10 md:py-14">
      <StepProgressBar currentStep={currentStep} />

      <div key={currentStep} className="step-enter">
        {currentStep === 1 && (
          <div className=" p-8 md:p-10 max-w-2xl mx-auto">
            <AdminProfileStep
              formData={formData}
              errors={currentErrors}
              updateField={updateField}
            />
            <NavigationControls
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              isValid={isCurrentStepValid}
              onBack={handleBack}
              onNext={handleNext}
              isSubmitting={isPending}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className=" p-8 md:p-10 max-w-2xl mx-auto">
            <HospitalInfoStep
              formData={formData}
              errors={currentErrors}
              updateField={updateField}
            />
            <NavigationControls
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              isValid={isCurrentStepValid}
              onBack={handleBack}
              onNext={handleNext}
              isSubmitting={isPending}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-5xl mx-auto">
            <ChoosePlanStep
              errors={currentErrors}
              onSelectPlan={handleSelectPlan}
              onBack={handleBack}
              isSubmitting={isPending}
            />
          </div>
        )}
      </div>
    </div>
  );
}
