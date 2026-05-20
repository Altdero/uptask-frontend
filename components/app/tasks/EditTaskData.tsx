"use client";

import EditTaskModal from "@/components/app/tasks/EditTaskModal";
import useGetData from "@/src/hooks/useGetData";
import { taskSchema } from "@/src/lib/schemas/taskSchema";
import { useSearchParams } from "next/navigation";

type EditTaskDataProps = {
  projectId: string;
};

export default function EditTaskData({ projectId }: EditTaskDataProps) {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("editTask");

  const { data } = useGetData({
    url: taskId ? `/projects/${projectId}/tasks/${taskId}` : null,
    schema: taskSchema,
  });

  if (!data || !taskId) return null;

  return <EditTaskModal data={data} taskId={taskId} projectId={projectId} />;
}
