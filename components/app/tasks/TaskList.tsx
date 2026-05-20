"use client";

import TaskColumn from "@/components/app/tasks/TaskColumn";
import { updateStatus } from "@/src/api/TaskAPI";
import { TASK_STATUSES } from "@/src/constants/taskStatus";
import { projectSchema } from "@/src/lib/schemas/projectSchema";
import type { ProjectType, TaskProjectType, TaskStatusType } from "@/src/types";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

type TaskListProps = {
  tasks: TaskProjectType[];
  canEdit: boolean;
  projectId: string;
};

type GroupedTasks = Record<TaskStatusType, TaskProjectType[]>;

const emptyGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

export default function TaskList({ tasks, canEdit, projectId }: TaskListProps) {
  const { mutate } = useSWRConfig();

  const groupedTasks = tasks.reduce<GroupedTasks>(
    (acc, task) => ({ ...acc, [task.status]: [...acc[task.status], task] }),
    { ...emptyGroups }
  );

  const handleDragEnd = async (e: DragEndEvent) => {
    const { over, active } = e;
    if (!over?.id) return;

    const taskId = active.id.toString();
    const status = over.id as TaskStatusType;

    const draggedTask = tasks.find((task) => task._id === taskId);
    if (!draggedTask || draggedTask.status === status) return;

    await mutate(
      [`/projects/${projectId}`, projectSchema],
      (current: ProjectType | undefined) => {
        if (!current) return current;
        return {
          ...current,
          tasks: current.tasks.map((task) =>
            task._id === taskId ? { ...task, status } : task
          ),
        };
      },
      { revalidate: false }
    );

    try {
      const message = await updateStatus({ projectId, taskId, status });
      toast.success(message, { toasterId: "notifications" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    } finally {
      await mutate([`/projects/${projectId}`, projectSchema]);
    }
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-black">Tasks</h2>
      <div className="flex min-h-100 overflow-auto">
        <DndContext onDragEnd={handleDragEnd}>
          {(
            Object.entries(groupedTasks) as [
              TaskStatusType,
              TaskProjectType[],
            ][]
          ).map(([status, statusTasks], index) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={statusTasks}
              canEdit={canEdit}
              projectId={projectId}
              isLast={index === Object.keys(TASK_STATUSES).length - 1}
            />
          ))}
        </DndContext>
      </div>
    </>
  );
}
