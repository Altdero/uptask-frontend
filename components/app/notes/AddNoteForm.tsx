"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { createNote } from "@/src/api/NoteAPI";
import { noteFormSchema } from "@/src/lib/schemas/noteSchema";
import { taskSchema } from "@/src/lib/schemas/taskSchema";
import type { NoteFormDataType, ProjectType, TaskType } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

type AddNoteFormProps = {
  projectId: ProjectType["_id"];
  taskId: TaskType["_id"];
};

export default function AddNoteForm({ projectId, taskId }: AddNoteFormProps) {
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormDataType>({
    defaultValues: { content: "" },
    resolver: zodResolver(noteFormSchema),
  });

  const handleAddNote = async (formData: NoteFormDataType) => {
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await createNote({ projectId, taskId, formData });
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      reset();
      await mutate([`/projects/${projectId}/tasks/${taskId}`, taskSchema]);
    } catch (error) {
      toast.dismiss(loader);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="mt-3 flex flex-col items-center gap-5"
      noValidate
    >
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="content" className="text-sm font-bold uppercase">
          Add Note
        </label>
        <input
          id="content"
          type="text"
          placeholder="Note content"
          className="w-full border border-gray-300 p-3 placeholder-zinc-400"
          {...register("content")}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full cursor-pointer self-center rounded-xl bg-fuchsia-500 px-6 py-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50 md:w-fit"
      >
        Add Note
      </button>
    </form>
  );
}
