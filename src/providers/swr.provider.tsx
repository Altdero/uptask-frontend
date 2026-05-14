"use client";

import { UnauthorizedError } from "@/src/lib/utils/errors";
import { fetcher } from "@/src/lib/utils/fetcher";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { toast } from "sonner";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <SWRConfig
      value={{
        fetcher,
        errorRetryCount: 1,
        errorRetryInterval: 5000,
        onErrorRetry: (error, _key, _config, _revalidate, { retryCount }) => {
          if (error instanceof UnauthorizedError) return;
          if (error.status === 404) return;
          if (retryCount >= 1) return;
        },
        onError: (error: Error) => {
          if (error instanceof UnauthorizedError) {
            const redirect = window.location.pathname + window.location.search;
            router.push(`/auth/login?redirect=${encodeURIComponent(redirect)}`);
          } else {
            toast.error("Something went wrong, please try again.", {
              toasterId: "notifications",
            });
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
