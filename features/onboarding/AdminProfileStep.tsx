import FormField from "./FormField";
import type { FormData, FormErrors } from "./MultiStepForm";

type Props = {
  formData: FormData;
  errors: FormErrors;
  updateField: (field: keyof FormData, value: string) => void;
};

export default function AdminProfileStep({ formData, errors, updateField }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Create Your Administrative Account
        </h1>
        <p className="text-text-muted text-sm mt-2">
          Define the primary account credentials for the workspace administrator.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <FormField
          label="Full Name"
          value={formData.fullName}
          onChange={(v) => updateField("fullName", v)}
          placeholder="e.g., Abiodun Oluwapelumi Amos"
          error={errors.fullName}
        />
        <FormField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(v) => updateField("email", v)}
          placeholder="e.g., director@yourhospital.com"
          error={errors.email}
          readOnly
        />
        <FormField
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(v) => updateField("phone", v)}
          placeholder="e.g., 08012345678"
          error={errors.phone}
        />
        <FormField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(v) => updateField("password", v)}
          placeholder="Min. 8 characters"
          error={errors.password}
        />
        <FormField
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(v) => updateField("confirmPassword", v)}
          placeholder="Re-enter your password"
          error={errors.confirmPassword}
        />
      </div>
    </div>
  );
}
