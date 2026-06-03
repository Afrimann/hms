"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor } from "lucide-react";

const EXEMPT_PATHS = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/staff/invite/accept",
];

const DESKTOP_BREAKPOINT = 1024;

export function DesktopGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < DESKTOP_BREAKPOINT);
    }
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isExempt = EXEMPT_PATHS.some((p) => pathname.startsWith(p));

  // Before hydration render children silently (SSR / first paint)
  if (!mounted || isExempt) return <>{children}</>;

  return (
    <>
      <AnimatePresence>
        {isMobile && (
          <motion.div
            key="mobile-wall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-[#F5F5F5] flex flex-col items-center justify-center px-8 text-center"
          >
            {/* Pulsing ring behind icon */}
            <div className="relative mb-8 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.18, 0, 0.18] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-28 h-28 rounded-full bg-[#2E4EEA]"
              />
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.1, 0, 0.1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute w-28 h-28 rounded-full bg-[#2E4EEA]"
              />

              {/* Icon card */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="relative w-20 h-20 rounded-2xl bg-[#2E4EEA] flex items-center justify-center shadow-xl shadow-[#2E4EEA]/30"
              >
                <Monitor size={36} className="text-white" strokeWidth={1.6} />
              </motion.div>
            </div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-3"
            >
              <p className="text-[#2E4EEA] font-bold text-lg tracking-tight">PHMS</p>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                Designed for Desktop
              </h2>
              <p className="text-sm text-[#595959] max-w-xs leading-relaxed">
                PHMS works best on a desktop or laptop. Please switch to a
                larger screen to continue.
              </p>
            </motion.div>

            {/* Animated dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-2"
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full bg-[#2E4EEA]"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always keep children in DOM — hidden on mobile to avoid interaction */}
      <div className={isMobile ? "invisible" : ""}>{children}</div>
    </>
  );
}
