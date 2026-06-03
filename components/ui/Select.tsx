"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "Select…",
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 border rounded-lg px-3 py-2 text-sm bg-white transition-colors outline-none
          ${open ? "border-[#2E4EEA] ring-2 ring-[#2E4EEA]/10" : "border-[#BFBFBF] hover:border-[#8C8C8C]"}
          ${selected ? "text-gray-800" : "text-[#BFBFBF]"}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
          className="shrink-0 text-[#595959]"
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-1.5 w-full bg-white border border-[#BFBFBF] rounded-xl shadow-lg overflow-hidden py-1"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors text-left
                      ${isSelected
                        ? "bg-[#2E4EEA]/5 text-[#2E4EEA] font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={13} className="shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
