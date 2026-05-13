import type { TaskStatusType } from "@/src/types";

export const TASK_STATUSES: Record<TaskStatusType, string> = {
  pending: "Pending",
  onHold: "On Hold",
  inProgress: "In Progress",
  underReview: "Under Review",
  completed: "Completed",
};
