"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { checkPassword } from "@/src/api/AuthAPI";
import { deleteProject } from "@/src/api/ProjectAPI";
import { checkPasswordSchema } from "@/src/lib/schemas/authSchema";
import type { CheckPasswordType } from "@/src/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

export default function DeleteProjectModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deleteProjectId = searchParams.get("deleteProject");
  const show = !!deleteProjectId;

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckPasswordType>({
    resolver: zodResolver(checkPasswordSchema),
    defaultValues: { password: "" },
  });

  const handleClose = () => {
    router.replace(pathname);
    reset();
  };

  const handleDelete = async (formData: CheckPasswordType) => {
    if (!deleteProjectId) return;
    setIsLoading(true);
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      await checkPassword(formData);
      const message = await deleteProject(deleteProjectId);
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      await mutate((key) => Array.isArray(key) && key[0] === "/projects");
      handleClose();
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
    <Dialog open={show} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-8 md:p-12">
            <DialogTitle as="h3" className="text-3xl font-black">
              Delete Project
            </DialogTitle>
            <p className="mt-2 text-lg">
              Confirm{" "}
              <span className="font-semibold text-fuchsia-500">
                project deletion
              </span>{" "}
              by entering your password
            </p>

            <form
              className="mt-10 flex flex-col gap-5"
              onSubmit={handleSubmit(handleDelete)}
              noValidate
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold uppercase"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Login password"
                    className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
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

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full cursor-pointer self-center rounded-xl bg-fuchsia-500 px-6 py-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50 md:w-fit"
              >
                Delete Project
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
