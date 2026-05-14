import { apiFetch } from "@/src/lib/utils/apiFetch";
import type {
  ProjectType,
  TeamMemberType,
  TeamMemberFormType,
} from "@/src/types";

export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: ProjectType["_id"];
  formData: TeamMemberFormType;
}) {
  return apiFetch<TeamMemberType>(
    `/projects/${projectId}/team/find`,
    "POST",
    formData
  );
}

export async function addUserToProject({
  projectId,
  id,
}: {
  projectId: ProjectType["_id"];
  id: TeamMemberType["_id"];
}) {
  return apiFetch<string>(`/projects/${projectId}/team`, "POST", { id });
}

export async function removeUserFromProject({
  projectId,
  userId,
}: {
  projectId: ProjectType["_id"];
  userId: TeamMemberType["_id"];
}) {
  return apiFetch<string>(`/projects/${projectId}/team/${userId}`, "DELETE");
}
