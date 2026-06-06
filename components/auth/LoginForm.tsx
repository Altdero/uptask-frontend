"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { authenticateUser } from "@/src/api/AuthAPI";
import { userLoginSchema } from "@/src/lib/schemas/authSchema";
import type { UserLoginType } from "@/src/types";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UserLoginType>({ resolver: zodResolver(userLoginSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: UserLoginType) => {
    setIsLoading(true);
    const loader = toast.loading("Please wait...", {
      toasterId: "loader",
    });
    try {
      await authenticateUser(formData);
      reset();
      router.push(redirect ?? "/");
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
        onSubmit={handleSubmit(handleLogin)}
        className="mt-10 flex flex-col gap-5 rounded-xl bg-white p-8"
        noValidate
      >
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-normal">Email</label>

          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="name@domain.com"
              className="w-full border border-gray-300 p-3 placeholder-zinc-400"
              {...register("email")}
            />
            <span className="absolute top-4 right-4">
              <EnvelopeIcon className="size-5 text-zinc-500" />
            </span>
          </div>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-normal">Password</label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="12345678"
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
          {errors.password ? (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          ) : (
            // Forgot Password
            <Link
              href="/auth/forgot-password"
              className="text-right text-sm font-semibold text-purple-400 transition hover:underline"
            >
              Forgot Password?
            </Link>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full cursor-pointer rounded-xl bg-fuchsia-500 p-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50"
        >
          Sign In
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            setValue("email", process.env.NEXT_PUBLIC_DEMO_EMAIL!);
            setValue("password", process.env.NEXT_PUBLIC_DEMO_PASSWORD!);
            handleSubmit(handleLogin)();
          }}
          className="w-full cursor-pointer rounded-xl border border-fuchsia-500 p-3 text-xl font-black text-fuchsia-500 uppercase transition hover:bg-fuchsia-50 disabled:opacity-50"
        >
          Login as Demo
        </button>
      </form>

      <nav className="mt-10 space-y-4 text-sm font-normal">
        {/* Sign Up */}
        <p className="text-zinc-300">
          Don&#39;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-purple-400 transition hover:underline"
          >
            Sign up
          </Link>
        </p>
      </nav>
    </>
  );
}
