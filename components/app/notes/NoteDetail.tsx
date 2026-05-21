"use client";

import { deleteNote } from "@/src/api/NoteAPI";
import useGetData from "@/src/hooks/useGetData";
import { userSchema } from "@/src/lib/schemas/authSchema";
import { taskSchema } from "@/src/lib/schemas/taskSchema";
import { formatDate } from "@/src/lib/utils/formatDate";
import type { NoteType, ProjectType, TaskType } from "@/src/types";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

type NoteDetailProps = {
  note: NoteType;
  projectId: ProjectType["_id"];
  taskId: TaskType["_id"];
};

export default function NoteDetail({
  note,
  projectId,
  taskId,
}: NoteDetailProps) {
  const { mutate } = useSWRConfig();
  const { data: user } = useGetData({ url: "/auth/user", schema: userSchema });
  const canDelete = useMemo(
    () => user?._id === note.createdBy._id,
    [user?._id, note.createdBy._id]
  );

  const handleDelete = async () => {
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await deleteNote({
        projectId,
        taskId,
        noteId: note._id,
      });
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
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
    <div className="flex justify-between gap-4 py-3">
      <div>
        <p className="text-zinc-500">
          <span className="font-semibold text-zinc-700">
            {note.createdBy.name}:{" "}
          </span>
          {note.content}
        </p>
        <p className="text-xs text-zinc-500">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <TrashIcon
          className="size-6 cursor-pointer text-red-500"
          onClick={handleDelete}
        />
      )}
    </div>
  );
}
