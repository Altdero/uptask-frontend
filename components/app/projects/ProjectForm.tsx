import ErrorMessage from "@/components/ui/ErrorMessage";
import type { ProjectFormDataType } from "@/src/types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormDataType>;
  errors: FieldErrors<ProjectFormDataType>;
};

export default function ProjectForm({ register, errors }: ProjectFormProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="projectName" className="text-sm font-bold uppercase">
          Project Name
        </label>
        <input
          id="projectName"
          type="text"
          placeholder="Project Name"
          className="w-full border border-gray-300 p-3 placeholder-zinc-400"
          {...register("projectName")}
        />
        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="clientName" className="text-sm font-bold uppercase">
          Client Name
        </label>
        <input
          id="clientName"
          type="text"
          placeholder="Client Name"
          className="w-full border border-gray-300 p-3 placeholder-zinc-400"
          {...register("clientName")}
        />
        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-bold uppercase">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Project Description"
          className="w-full border border-gray-300 p-3 placeholder-zinc-400"
          {...register("description")}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
