"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface ActionItem {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

interface ActionMenuProps {
  actions: ActionItem[];
}

export function ActionMenu({ actions }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg text-[#595959] hover:bg-gray-100 transition-colors"
      >
        <MoreVertical size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.13, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-1 w-44 bg-white border border-[#BFBFBF] rounded-xl shadow-lg py-1 origin-top-right"
          >
            {actions.map((action) => (
              <li key={action.label}>
                <button
                  type="button"
                  disabled={action.disabled}
                  onClick={() => {
                    action.onClick();
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                    ${action.variant === "danger"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {action.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
