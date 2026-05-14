import { apiFetch } from "@/src/lib/utils/apiFetch";
import type {
  ProjectType,
  TaskType,
  TaskFormDataType,
  TaskStatusType,
} from "@/src/types";

type TaskAPIArgs = {
  projectId: ProjectType["_id"];
  taskId: TaskType["_id"];
  formData: TaskFormDataType;
  status: TaskStatusType;
};

export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPIArgs, "formData" | "projectId">) {
  return apiFetch<string>(`/projects/${projectId}/tasks`, "POST", formData);
}

export async function updateTask({
  projectId,
  taskId,
  formData,
}: Pick<TaskAPIArgs, "projectId" | "taskId" | "formData">) {
  return apiFetch<string>(
    `/projects/${projectId}/tasks/${taskId}`,
    "PUT",
    formData
  );
}

export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskAPIArgs, "projectId" | "taskId">) {
  return apiFetch<string>(`/projects/${projectId}/tasks/${taskId}`, "DELETE");
}

export async function updateStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPIArgs, "projectId" | "taskId" | "status">) {
  return apiFetch<string>(
    `/projects/${projectId}/tasks/${taskId}/status`,
    "POST",
    { status }
  );
}
