"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError } from "@/lib/api-client";
import { Toaster, toast } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError(error) {
              if (error instanceof ApiError) {
                toast.error(error.message);
              } else {
                toast.error("Something went wrong. Please try again.");
              }
            },
          },
          queries: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
