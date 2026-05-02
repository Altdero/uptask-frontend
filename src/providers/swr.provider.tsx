"use client";

import { fetcher } from "@/src/lib/utils/fetcher";
import { type ReactNode } from "react";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        errorRetryCount: 1,
        errorRetryInterval: 5000,
        onErrorRetry: (error, _key, _config, _revalidate, { retryCount }) => {
          if (error.status === 404) return;
          if (retryCount >= 1) return;
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
