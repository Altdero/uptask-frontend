"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { confirmAccount } from "@/src/api/AuthAPI";
import { confirmAccountSchema } from "@/src/lib/schemas/authSchema";
import type { ConfirmAccountType } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ConfirmAccountForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConfirmAccountType>({
    resolver: zodResolver(confirmAccountSchema),
    defaultValues: { token: "" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirmAccount = async (formData: ConfirmAccountType) => {
    setIsLoading(true);
    const loader = toast.loading("Please wait...", {
      toasterId: "loader",
    });
    try {
      const message = await confirmAccount(formData);
      toast.success(message, { toasterId: "notifications" });
      reset();
      router.push("/auth/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    } finally {
      setIsLoading(false);
      toast.dismiss(loader);
    }
  };

  return (
    <>
      <form
        className="mt-10 flex flex-col gap-5 rounded-xl bg-white p-8"
        onSubmit={handleSubmit(handleConfirmAccount)}
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
          Confirm Account
        </button>
      </form>

      <nav className="mt-10 space-y-4 text-sm font-normal">
        <p className="text-zinc-300">
          Didn&#39;t receive your code?{" "}
          <Link
            href="/auth/request-code"
            className="font-semibold text-purple-400 transition hover:underline"
          >
            Send again
          </Link>
        </p>
      </nav>
    </>
  );
}
