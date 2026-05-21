"use client";

import EditTaskModal from "@/components/app/tasks/EditTaskModal";
import useGetData from "@/src/hooks/useGetData";
import { taskSchema } from "@/src/lib/schemas/taskSchema";
import type { ProjectType } from "@/src/types";
import { useSearchParams } from "next/navigation";
import type { KeyedMutator } from "swr";

type EditTaskDataProps = {
  projectId: string;
  projectMutate: KeyedMutator<ProjectType>;
};

export default function EditTaskData({
  projectId,
  projectMutate,
}: EditTaskDataProps) {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("editTask");

  const { data } = useGetData({
    url: taskId ? `/projects/${projectId}/tasks/${taskId}` : null,
    schema: taskSchema,
  });

  if (!data || !taskId) return null;

  return (
    <EditTaskModal
      data={data}
      taskId={taskId}
      projectId={projectId}
      projectMutate={projectMutate}
    />
  );
}
