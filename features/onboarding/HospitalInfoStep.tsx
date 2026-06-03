import FormField from "./FormField";
import type { FormData, FormErrors } from "./MultiStepForm";

type Props = {
  formData: FormData;
  errors: FormErrors;
  updateField: (field: keyof FormData, value: string) => void;
};

export default function HospitalInfoStep({ formData, errors, updateField }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Setup Your Medical Facility
        </h1>
        <p className="text-text-muted text-sm mt-2">
          Provide your hospital&apos;s official details to complete facility registration.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <FormField
          label="Hospital Name"
          value={formData.hospitalName}
          onChange={(v) => updateField("hospitalName", v)}
          placeholder="e.g., Omotosho Healthcare Center"
          error={errors.hospitalName}
        />
        <FormField
          label="Hospital Email Address"
          type="email"
          value={formData.hospitalEmail}
          onChange={(v) => updateField("hospitalEmail", v)}
          placeholder="e.g., director@yourhospital.com"
          error={errors.hospitalEmail}
        />
        <FormField
          label="Hospital Phone Number"
          type="tel"
          value={formData.hospitalPhone}
          onChange={(v) => updateField("hospitalPhone", v)}
          placeholder="e.g., 08012345678"
          error={errors.hospitalPhone}
        />
        <FormField
          label="Hospital Address"
          value={formData.address}
          onChange={(v) => updateField("address", v)}
          placeholder="e.g., 123, Owonikoko way, Adedayo Bustop, Lagos state."
          error={errors.address}
        />
      </div>
    </div>
  );
}
