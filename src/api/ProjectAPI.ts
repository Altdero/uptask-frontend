import { apiFetch } from "@/src/lib/utils/apiFetch";
import {
  dashboardProjectSchema,
  editProjectSchema,
  projectSchema,
} from "@/src/lib/schemas/projectSchema";
import type { ProjectType, ProjectFormDataType } from "@/src/types";

export async function createProject(formData: ProjectFormDataType) {
  return apiFetch<string>("/projects", "POST", formData);
}

export async function getProjects() {
  const data = await apiFetch<unknown>("/projects");
  const result = dashboardProjectSchema.safeParse(data);
  return result.success ? result.data : undefined;
}

export async function getProjectById(id: ProjectType["_id"]) {
  const data = await apiFetch<unknown>(`/projects/${id}`);
  const result = editProjectSchema.safeParse(data);
  return result.success ? result.data : undefined;
}

export async function getFullProject(id: ProjectType["_id"]) {
  const data = await apiFetch<unknown>(`/projects/${id}`);
  const result = projectSchema.safeParse(data);
  return result.success ? result.data : undefined;
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
