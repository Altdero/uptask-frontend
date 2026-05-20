"use client";

import TaskForm from "@/components/app/tasks/TaskForm";
import { updateTask } from "@/src/api/TaskAPI";
import { projectSchema } from "@/src/lib/schemas/projectSchema";
import { taskFormSchema } from "@/src/lib/schemas/taskSchema";
import type { TaskFormDataType, TaskType } from "@/src/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

type EditTaskModalProps = {
  data: TaskType;
  taskId: TaskType["_id"];
  projectId: string;
};

export default function EditTaskModal({
  data,
  taskId,
  projectId,
}: EditTaskModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormDataType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { name: data.name, description: data.description },
  });

  const handleClose = () => router.replace(pathname);

  const handleEdit = async (formData: TaskFormDataType) => {
    setIsLoading(true);
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await updateTask({ projectId, taskId, formData });
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      await mutate([`/projects/${projectId}`, projectSchema]);
      reset();
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
    <Dialog open onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-8 md:p-12">
            <DialogTitle as="h3" className="text-3xl font-black">
              Edit Task
            </DialogTitle>
            <p className="mt-2 text-lg">
              Make changes to a task in{" "}
              <span className="font-semibold text-fuchsia-600">this form</span>
            </p>
            <form
              className="mt-10 flex flex-col gap-5"
              onSubmit={handleSubmit(handleEdit)}
              noValidate
            >
              <TaskForm register={register} errors={errors} />
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full cursor-pointer self-center rounded-xl bg-fuchsia-500 px-6 py-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50 md:w-fit"
              >
                Save Changes
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
