"use client";

import TaskCard from "@/components/app/tasks/TaskCard";
import { TASK_STATUSES } from "@/src/constants/taskStatus";
import type { TaskProjectType, TaskStatusType } from "@/src/types";
import { useDroppable } from "@dnd-kit/core";

type TaskColumnProps = {
  status: TaskStatusType;
  tasks: TaskProjectType[];
  canEdit: boolean;
  projectId: string;
  isLast: boolean;
};

const statusStyles: Record<TaskStatusType, string> = {
  pending: "border-t-zinc-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};

export default function TaskColumn({
  status,
  tasks,
  canEdit,
  projectId,
  isLast,
}: TaskColumnProps) {
  const { isOver, setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`min-w-75 px-2.5 first:pl-0 2xl:w-1/5 2xl:min-w-0 ${isLast ? "pr-0" : "border-r border-r-zinc-300"}`}
    >
      <h3
        className={`rounded-md border border-t-8 border-zinc-300 bg-white p-3 text-lg font-light capitalize ${statusStyles[status]}`}
      >
        {TASK_STATUSES[status]}
      </h3>
      <ul
        className={`mt-5 min-h-32 space-y-5 transition-colors ${isOver ? "bg-zinc-100" : ""}`}
      >
        {tasks.length === 0 ? (
          <li className="pt-3 text-center text-zinc-500">No tasks</li>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              canEdit={canEdit}
              projectId={projectId}
              isLast={isLast}
            />
          ))
        )}
      </ul>
    </div>
  );
}
