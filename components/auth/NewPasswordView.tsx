"use client";

import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordTokenForm from "@/components/auth/NewPasswordTokenForm";
import { useState } from "react";

let persistedToken = "";

export default function NewPasswordView() {
  const [token, setToken] = useState(persistedToken);
  const [isValidToken, setIsValidToken] = useState(!!persistedToken);

  const handleSetToken = (t: string) => {
    persistedToken = t;
    setToken(t);
  };

  const handleSetIsValidToken = (value: boolean) => {
    if (!value) persistedToken = "";
    setIsValidToken(value);
  };

  const handlePasswordUpdated = () => {
    persistedToken = "";
  };

  return (
    <>
      {isValidToken ? (
        <NewPasswordForm
          token={token}
          onPasswordUpdated={handlePasswordUpdated}
        />
      ) : (
        <NewPasswordTokenForm
          setToken={handleSetToken}
          setIsValidToken={handleSetIsValidToken}
        />
      )}
    </>
  );
}
