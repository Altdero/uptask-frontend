import { apiFetch } from "@/src/lib/utils/apiFetch";
import { taskSchema } from "@/src/lib/schemas/taskSchema";
import type { Project, Task, TaskFormData, TaskStatus } from "@/src/types";

type TaskAPIArgs = {
  projectId: Project["_id"];
  taskId: Task["_id"];
  formData: TaskFormData;
  status: TaskStatus;
};

export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPIArgs, "formData" | "projectId">) {
  return apiFetch<string>(`/projects/${projectId}/tasks`, "POST", formData);
}

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPIArgs, "projectId" | "taskId">) {
  const data = await apiFetch<unknown>(
    `/projects/${projectId}/tasks/${taskId}`
  );
  const result = taskSchema.safeParse(data);
  return result.success ? result.data : undefined;
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
