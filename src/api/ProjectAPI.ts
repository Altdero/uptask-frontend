import { apiFetch } from "@/src/lib/utils/apiFetch";
import type { ProjectType, ProjectFormDataType } from "@/src/types";

export async function createProject(formData: ProjectFormDataType) {
  return apiFetch<string>("/projects", "POST", formData);
}

export async function updateProject({
  formData,
  projectId,
}: {
  formData: ProjectFormDataType;
  projectId: ProjectType["_id"];
}) {
  return apiFetch<string>(`/projects/${projectId}`, "PUT", formData);
}

export async function deleteProject(id: ProjectType["_id"]) {
  return apiFetch<string>(`/projects/${id}`, "DELETE");
}
