import { apiFetch } from "@/src/lib/utils/apiFetch";
import { teamMembersSchema } from "@/src/lib/schemas/teamSchema";
import type { Project, TeamMember, TeamMemberForm } from "@/src/types";

export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: TeamMemberForm;
}) {
  return apiFetch<TeamMember>(
    `/projects/${projectId}/team/find`,
    "POST",
    formData
  );
}

export async function addUserToProject({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: TeamMember["_id"];
}) {
  return apiFetch<string>(`/projects/${projectId}/team`, "POST", { id });
}

export async function removeUserFromProject({
  projectId,
  userId,
}: {
  projectId: Project["_id"];
  userId: TeamMember["_id"];
}) {
  return apiFetch<string>(`/projects/${projectId}/team/${userId}`, "DELETE");
}

export async function getProjectTeam(projectId: Project["_id"]) {
  const data = await apiFetch<unknown>(`/projects/${projectId}/team`);
  const result = teamMembersSchema.safeParse(data);
  return result.success ? result.data : undefined;
}
