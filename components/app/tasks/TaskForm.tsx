import ErrorMessage from "@/components/ui/ErrorMessage";
import type { TaskFormDataType } from "@/src/types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type TaskFormProps = {
  register: UseFormRegister<TaskFormDataType>;
  errors: FieldErrors<TaskFormDataType>;
};

export default function TaskForm({ register, errors }: TaskFormProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-bold uppercase">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Task name"
          className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
          {...register("name")}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-bold uppercase">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Task description"
          className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
          {...register("description")}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
