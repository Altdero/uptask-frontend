"use client";

import ProjectForm from "@/components/app/projects/ProjectForm";
import { createProject } from "@/src/api/ProjectAPI";
import { projectFormSchema } from "@/src/lib/schemas/projectSchema";
import type { ProjectFormDataType } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateProjectForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormDataType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: "",
      clientName: "",
      description: "",
    },
  });

  const handleCreate = async (formData: ProjectFormDataType) => {
    setIsLoading(true);
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await createProject(formData);
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      router.push("/");
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
      className="mt-6 flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-8 shadow-md"
      onSubmit={handleSubmit(handleCreate)}
      noValidate
    >
      <ProjectForm register={register} errors={errors} />
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 w-full cursor-pointer self-center rounded-xl bg-fuchsia-500 px-6 py-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50 md:w-fit"
      >
        Create Project
      </button>
    </form>
  );
}
