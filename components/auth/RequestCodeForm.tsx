"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { requestConfirmationCodeSchema } from "@/src/lib/schemas/authSchema";
import type { RequestConfirmationCodeForm } from "@/src/types";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RequestCodeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestConfirmationCodeForm>({
    resolver: zodResolver(requestConfirmationCodeSchema),
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
    console.log(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRequestCode)}
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

        <button
          type="submit"
          className="mt-4 w-full cursor-pointer rounded-xl bg-fuchsia-500 p-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50"
        >
          Send Code
        </button>
      </form>

      <nav className="mt-10 space-y-4 text-sm font-normal">
        {/* Sign In */}
        <p className="text-zinc-300">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-purple-400 transition hover:underline"
          >
            Sign in
          </Link>
        </p>
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
