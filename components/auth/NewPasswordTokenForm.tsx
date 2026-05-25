"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { validateToken } from "@/src/api/AuthAPI";
import { confirmAccountSchema } from "@/src/lib/schemas/authSchema";
import type { ConfirmAccountType } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type NewPasswordTokenFormProps = {
  setToken: (token: string) => void;
  setIsValidToken: (value: boolean) => void;
};

export default function NewPasswordTokenForm({
  setToken,
  setIsValidToken,
}: NewPasswordTokenFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConfirmAccountType>({
    resolver: zodResolver(confirmAccountSchema),
    defaultValues: { token: "" },
  });

  const handleValidateToken = async (formData: ConfirmAccountType) => {
    setIsLoading(true);
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await validateToken(formData);
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      setToken(formData.token);
      setIsValidToken(true);
      reset();
    } catch (error) {
      toast.dismiss(loader);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-black text-white">Reset Password</h1>
      <p className="mt-2 text-xl font-light text-white">
        Enter the
        <span className="font-semibold text-fuchsia-500"> code </span>
        you received by email
      </p>

      <form
        className="mt-10 flex flex-col gap-5 rounded-xl bg-white p-8"
        onSubmit={handleSubmit(handleValidateToken)}
      >
        <Controller
          control={control}
          name="token"
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-2">
              <OTPInput
                maxLength={6}
                value={value}
                onChange={onChange}
                pattern={REGEXP_ONLY_DIGITS}
                containerClassName="flex justify-center gap-2"
                render={({ slots }) => (
                  <>
                    {slots.map((slot, i) => (
                      <div
                        key={i}
                        className={`flex h-12 w-10 items-center justify-center rounded-lg border text-lg font-semibold ${slot.isActive ? "border-fuchsia-500" : "border-gray-300"}`}
                      >
                        {slot.char ??
                          (slot.hasFakeCaret ? (
                            <span className="animate-pulse text-fuchsia-500">
                              |
                            </span>
                          ) : null)}
                      </div>
                    ))}
                  </>
                )}
              />
              {errors.token && (
                <ErrorMessage>{errors.token.message}</ErrorMessage>
              )}
            </div>
          )}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full cursor-pointer rounded-xl bg-fuchsia-500 p-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50"
        >
          Validate Code
        </button>
      </form>

      <nav className="mt-10 space-y-4 text-sm font-normal">
        <p className="text-zinc-300">
          Didn&#39;t receive your code?{" "}
          <Link
            href="/auth/forgot-password"
            className="font-semibold text-purple-400 transition hover:underline"
          >
            Request again
          </Link>
        </p>
      </nav>
    </>
  );
}
