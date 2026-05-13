import { apiFetch } from "@/src/lib/utils/apiFetch";
import { teamMembersSchema } from "@/src/lib/schemas/teamSchema";
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

export async function getProjectTeam(projectId: ProjectType["_id"]) {
  const data = await apiFetch<unknown>(`/projects/${projectId}/team`);
  const result = teamMembersSchema.safeParse(data);
  return result.success ? result.data : undefined;
}
