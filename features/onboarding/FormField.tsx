type SelectOption = { value: string; label: string };

type FormFieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  options?: SelectOption[];
  readOnly?: boolean;
};

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  options,
  readOnly = false,
}: FormFieldProps) {
  const baseClass = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200
    ${readOnly
      ? "bg-gray-50 border-border text-gray-500 cursor-not-allowed select-none"
      : error
        ? "bg-red-50/20 border-red-400 focus:border-red-500"
        : "bg-white text-gray-900 border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
    } placeholder:text-gray-400`;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-800">
        {label}
        {readOnly && (
          <span className="ml-2 text-xs font-normal text-gray-400">(pre-filled)</span>
        )}
      </label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={readOnly}
          className={`${baseClass} cursor-pointer`}
        >
          <option value="" disabled>
            {placeholder ?? `Select ${label}`}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={baseClass}
        />
      )}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>&#9679;</span> {error}
        </p>
      )}
    </div>
  );
}
