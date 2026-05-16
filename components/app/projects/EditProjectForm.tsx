"use client";

import ProjectForm from "@/components/app/projects/ProjectForm";
import Loader from "@/components/ui/icons/Loader";
import { updateProject } from "@/src/api/ProjectAPI";
import useGetData from "@/src/hooks/useGetData";
import {
  editProjectSchema,
  projectFormSchema,
} from "@/src/lib/schemas/projectSchema";
import type { ProjectFormDataType, ProjectType } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

type EditProjectFormProps = {
  projectId: ProjectType["_id"];
};

export default function EditProjectForm({ projectId }: EditProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: loadingProject } = useGetData({
    url: `/projects/${projectId}`,
    schema: editProjectSchema,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormDataType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { projectName: "", clientName: "", description: "" },
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  if (loadingProject) return <Loader />;

  const handleEdit = async (formData: ProjectFormDataType) => {
    setIsLoading(true);
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await updateProject({ formData, projectId });
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      await mutate(
        (key) =>
          Array.isArray(key) &&
          (key[0] === "/projects" || key[0] === `/projects/${projectId}`)
      );
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
      onSubmit={handleSubmit(handleEdit)}
      noValidate
    >
      <ProjectForm register={register} errors={errors} />
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-fit cursor-pointer self-center rounded-xl bg-fuchsia-500 px-6 py-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50"
      >
        Save Changes
      </button>
    </form>
  );
}
