"use client";

import AddMemberModal from "@/components/app/team/AddMemberModal";
import Loader from "@/components/ui/icons/Loader";
import { removeUserFromProject } from "@/src/api/TeamAPI";
import useCanEdit from "@/src/hooks/useCanEdit";
import useGetData from "@/src/hooks/useGetData";
import { teamMembersSchema } from "@/src/lib/schemas/teamSchema";
import type { ProjectType } from "@/src/types";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type TeamViewProps = {
  projectId: ProjectType["_id"];
};

export default function TeamView({ projectId }: TeamViewProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data,
    isLoading,
    mutate: teamMutate,
  } = useGetData({
    url: `/projects/${projectId}/team`,
    schema: teamMembersSchema,
  });

  const canEdit = useCanEdit(projectId);

  const handleRemove = async (userId: string) => {
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await removeUserFromProject({ projectId, userId });
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      await teamMutate();
    } catch (error) {
      toast.dismiss(loader);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    }
  };

  if (isLoading) return <Loader />;
  if (!data) return null;

  return (
    <>
      <nav className="my-5 flex items-center justify-between gap-3">
        <Link
          href={`/projects/${projectId}`}
          className="font-semibold text-purple-400 transition hover:underline"
        >
          Back to Project
        </Link>
        {canEdit && (
          <button
            type="button"
            className="cursor-pointer rounded-xl border-2 border-purple-500 bg-purple-50 px-3 py-1 font-semibold text-purple-500 uppercase transition hover:bg-purple-500 hover:text-white disabled:opacity-50 md:px-6 md:py-2 md:text-lg"
            onClick={() => router.push(`${pathname}?addMember=true`)}
          >
            Add Member
          </button>
        )}
      </nav>

      <h2 className="mb-6 text-3xl font-black">Current Members</h2>

      {data.length ? (
        <ul className="mt-5">
          {data.map((member) => (
            <li
              key={member._id}
              className="flex items-center justify-between gap-x-6 rounded-md border border-zinc-200 bg-white p-4 shadow-md not-last-of-type:mb-4 md:p-6"
            >
              <div>
                <p className="text-lg font-semibold text-zinc-700">
                  {member.name}
                </p>
                <p className="text-sm text-zinc-400">{member.email}</p>
              </div>

              {canEdit && (
                <TrashIcon
                  className="size-6 cursor-pointer text-red-500"
                  onClick={() => handleRemove(member._id)}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-20 text-center text-zinc-500">No team members yet</p>
      )}

      <AddMemberModal projectId={projectId} teamMutate={teamMutate} />
    </>
  );
}
