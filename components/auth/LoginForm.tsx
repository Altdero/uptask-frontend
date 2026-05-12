"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { userLoginSchema } from "@/src/lib/schemas/authSchema";
import type { UserLoginForm } from "@/src/types";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginForm>({ resolver: zodResolver(userLoginSchema) });

  const handleLogin = (formData: UserLoginForm) => {
    console.log(formData);
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
              <EnvelopeIcon className="h-5 w-5 text-zinc-500" />
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
                <EyeIcon className="h-5 w-5 text-zinc-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-zinc-500" />
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
          className="mt-4 w-full cursor-pointer rounded-xl bg-fuchsia-500 p-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50"
        >
          Sign In
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
