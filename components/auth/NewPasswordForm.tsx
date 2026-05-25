"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { updatePasswordWithToken } from "@/src/api/AuthAPI";
import { newPasswordSchema } from "@/src/lib/schemas/authSchema";
import type { ConfirmAccountType, NewPasswordType } from "@/src/types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type NewPasswordFormProps = {
  token: ConfirmAccountType["token"];
  onPasswordUpdated: () => void;
};

export default function NewPasswordForm({
  token,
  onPasswordUpdated,
}: NewPasswordFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", password_confirmation: "" },
  });

  const handleNewPassword = async (formData: NewPasswordType) => {
    setIsLoading(true);
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await updatePasswordWithToken({ formData, token });
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      reset();
      onPasswordUpdated();
      router.push("/auth/login");
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
        Enter your
        <span className="font-semibold text-fuchsia-500"> new password </span>
      </p>

      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="mt-10 flex flex-col gap-5 rounded-xl bg-white p-8"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg font-normal">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className="w-full border border-gray-300 p-3 placeholder-zinc-400"
              {...register("password")}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              {showPassword ? (
                <EyeIcon className="size-5 text-zinc-500" />
              ) : (
                <EyeSlashIcon className="size-5 text-zinc-500" />
              )}
            </span>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-normal">Confirm Password</label>
          <div className="relative">
            <input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat new password"
              className="w-full border border-gray-300 p-3 placeholder-zinc-400"
              {...register("password_confirmation")}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeIcon className="size-5 text-zinc-500" />
              ) : (
                <EyeSlashIcon className="size-5 text-zinc-500" />
              )}
            </span>
          </div>
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full cursor-pointer rounded-xl bg-fuchsia-500 p-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50"
        >
          Set New Password
        </button>
      </form>
    </>
  );
}
