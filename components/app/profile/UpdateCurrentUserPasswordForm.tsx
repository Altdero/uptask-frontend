"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { changePassword } from "@/src/api/ProfileAPI";
import { updateCurrentUserPasswordSchema } from "@/src/lib/schemas/authSchema";
import type { UpdateCurrentUserPasswordType } from "@/src/types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateCurrentUserPasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UpdateCurrentUserPasswordType>({
    resolver: zodResolver(updateCurrentUserPasswordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleUpdatePassword = async (
    formData: UpdateCurrentUserPasswordType
  ) => {
    setIsLoading(true);
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await changePassword(formData);
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
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
    <form
      className="flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-8 shadow-md"
      onSubmit={handleSubmit(handleUpdatePassword)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase">Current Password</label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Your current password"
            className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
            {...register("current_password")}
          />
          <span
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            {showCurrentPassword ? (
              <EyeIcon className="size-5 text-zinc-400" />
            ) : (
              <EyeSlashIcon className="size-5 text-zinc-400" />
            )}
          </span>
        </div>
        {errors.current_password && (
          <ErrorMessage>{errors.current_password.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase">New Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your new password"
            className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
            {...register("password")}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            {showPassword ? (
              <EyeIcon className="size-5 text-zinc-400" />
            ) : (
              <EyeSlashIcon className="size-5 text-zinc-400" />
            )}
          </span>
        </div>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase">Confirm Password</label>
        <div className="relative">
          <input
            type={showPasswordConfirmation ? "text" : "password"}
            placeholder="Repeat new password"
            className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
            {...register("password_confirmation")}
          />
          <span
            onClick={() =>
              setShowPasswordConfirmation(!showPasswordConfirmation)
            }
            className="absolute top-4 right-4 cursor-pointer"
          >
            {showPasswordConfirmation ? (
              <EyeIcon className="size-5 text-zinc-400" />
            ) : (
              <EyeSlashIcon className="size-5 text-zinc-400" />
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
        className="mt-2 w-full cursor-pointer self-center rounded-xl bg-fuchsia-500 px-6 py-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50 md:w-fit"
      >
        Update Password
      </button>
    </form>
  );
}
