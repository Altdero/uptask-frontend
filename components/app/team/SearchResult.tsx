"use client";

import { addUserToProject } from "@/src/api/TeamAPI";
import type { ProjectType, TeamMembersType, TeamMemberType } from "@/src/types";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import type { KeyedMutator } from "swr";

type SearchResultProps = {
  user: TeamMemberType;
  projectId: ProjectType["_id"];
  reset: () => void;
  teamMutate: KeyedMutator<TeamMembersType>;
};

export default function SearchResult({
  user,
  projectId,
  reset,
  teamMutate,
}: SearchResultProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleAdd = async () => {
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await addUserToProject({ projectId, id: user._id });
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      reset();
      router.replace(pathname);
      await teamMutate();
    } catch (error) {
      toast.dismiss(loader);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    }
  };

  return (
    <div className="mt-10">
      <p className="mb-3 font-bold">Result:</p>
      <div className="flex items-center justify-between rounded-sm border border-zinc-200 bg-white px-5 py-4 shadow-sm">
        <div className="space-y-1">
          <p className="font-black text-zinc-700">{user.name}</p>
          <p className="text-sm text-zinc-400">{user.email}</p>
        </div>
        <button
          type="button"
          className="cursor-pointer rounded-xl px-6 py-2 font-semibold text-purple-500 transition hover:bg-purple-50"
          onClick={handleAdd}
        >
          Add to Project
        </button>
      </div>
    </div>
  );
}
