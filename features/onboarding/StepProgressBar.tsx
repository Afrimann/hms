const STEPS = [
  { number: 1, label: "Admin Profile" },
  { number: 2, label: "Hospital Info" },
  { number: 3, label: "Choose Plan" },
];

type Props = {
  currentStep: number;
};

export default function StepProgressBar({ currentStep }: Props) {
  return (
    <div className="flex items-center w-full mb-10 max-w-2xl justify-center mx-auto">
      {STEPS.map((step, i) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold transition-colors duration-300
                  ${isActive || isCompleted ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}
              >
                {step.number}
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap transition-colors duration-300
                  ${isActive ? "text-gray-900 font-semibold" : isCompleted ? "text-primary" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="flex-1 mx-3 flex items-center">
                <div
                  className={`w-full border-t-2 border-dashed transition-colors duration-300
                    ${isCompleted ? "border-primary" : "border-gray-200"}`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
