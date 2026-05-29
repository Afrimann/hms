const NEXT_LABELS: Record<number, string> = {
  1: "Save & Continue To Hospital Info",
  2: "Save & Continue To Choose Plan",
  3: "Complete Registration",
};

type Props = {
  currentStep: number;
  totalSteps: number;
  isValid: boolean;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
};

export default function NavigationControls({
  currentStep,
  totalSteps,
  isValid,
  onBack,
  onNext,
  isSubmitting = false,
}: Props) {
  const isLastStep = currentStep === totalSteps;
  const nextLabel = isSubmitting ? "Submitting..." : NEXT_LABELS[currentStep];

  return (
    <div className="flex items-center gap-3 mt-8">
      {currentStep > 1 && (
        <div
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600
            text-center cursor-pointer hover:border-gray-300 hover:text-gray-800 transition-all duration-200 select-none"
        >
          Back
        </div>
      )}

      <div
        onClick={isValid && !isSubmitting ? onNext : undefined}
        className={`flex-[2] py-3.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 select-none
          ${isValid && !isSubmitting
            ? isLastStep
              ? "bg-primary text-white cursor-pointer hover:opacity-90 shadow-lg shadow-primary/25"
              : "bg-primary text-white cursor-pointer hover:opacity-90 shadow-lg shadow-primary/25"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        {nextLabel}
      </div>
    </div>
  );
}
