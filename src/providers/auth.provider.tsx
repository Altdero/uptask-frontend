"use client";

import { AuthStore } from "@/src/stores/AuthStore";
import { createContext, type ReactNode, useState } from "react";

export const AuthContext = createContext<AuthStore | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => new AuthStore());

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
