"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import SearchResult from "@/components/app/team/SearchResult";
import { findUserByEmail } from "@/src/api/TeamAPI";
import { teamMemberFormSchema } from "@/src/lib/schemas/teamSchema";
import type {
  ProjectType,
  TeamMemberFormType,
  TeamMembersType,
  TeamMemberType,
} from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { KeyedMutator } from "swr";

type AddMemberFormProps = {
  projectId: ProjectType["_id"];
  teamMutate: KeyedMutator<TeamMembersType>;
};

export default function AddMemberForm({
  projectId,
  teamMutate,
}: AddMemberFormProps) {
  const [result, setResult] = useState<TeamMemberType | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormType>({
    defaultValues: { email: "" },
    resolver: zodResolver(teamMemberFormSchema),
  });

  const handleSearch = async (formData: TeamMemberFormType) => {
    try {
      const user = await findUserByEmail({ projectId, formData });
      setResult(user);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    }
  };

  const resetForm = () => {
    reset();
    setResult(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="mt-10 flex flex-col gap-5"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold uppercase">
            Member Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="User email to search"
            className="w-full rounded-lg border border-zinc-300 p-3 placeholder-zinc-400"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full cursor-pointer rounded-xl bg-fuchsia-500 px-6 py-3 text-xl font-black text-white uppercase transition hover:bg-fuchsia-600 disabled:opacity-50"
        >
          Search
        </button>
      </form>

      {result && (
        <SearchResult
          user={result}
          projectId={projectId}
          reset={resetForm}
          teamMutate={teamMutate}
        />
      )}
    </>
  );
}
