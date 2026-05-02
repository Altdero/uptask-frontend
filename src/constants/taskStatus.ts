import type { TaskStatus } from "@/src/types";

export const TASK_STATUSES: Record<TaskStatus, string> = {
  pending: "Pending",
  onHold: "On Hold",
  inProgress: "In Progress",
  underReview: "Under Review",
  completed: "Completed",
};
