"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import Loader from "@/components/ui/icons/Loader";
import { updateProfile } from "@/src/api/ProfileAPI";
import useGetData from "@/src/hooks/useGetData";
import { userProfileSchema, userSchema } from "@/src/lib/schemas/authSchema";
import type { UserProfileType } from "@/src/types";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

export default function ProfileForm() {
  const { data, isLoading } = useGetData({
    url: "/auth/user",
    schema: userSchema,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: { name: "", email: "" },
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  if (isLoading) return <Loader />;

  const handleUpdateProfile = async (formData: UserProfileType) => {
    setIsSubmitting(true);
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await updateProfile(formData);
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      await mutate((key) => Array.isArray(key) && key[0] === "/auth/user");
    } catch (error) {
      toast.dismiss(loader);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-8 shadow-md"
      onSubmit={handleSubmit(handleUpdateProfile)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-bold uppercase">
          Name
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
            {...register("name")}
          />
          <span className="absolute top-4 right-4">
            <UserIcon className="size-5 text-zinc-400" />
          </span>
        </div>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-bold uppercase">
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="name@domain.com"
            className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
            {...register("email")}
          />
          <span className="absolute top-4 right-4">
            <EnvelopeIcon className="size-5 text-zinc-400" />
          </span>
        </div>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full cursor-pointer self-center rounded-xl bg-fuchsia-500 px-6 py-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50 md:w-fit"
      >
        Save Changes
      </button>
    </form>
  );
}
