import { apiFetch } from "@/src/lib/utils/apiFetch";
import type { Note, NoteFormData, Project, Task } from "@/src/types";

type NoteAPIArgs = {
  projectId: Project["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
  formData: NoteFormData;
};

export async function createNote({
  projectId,
  taskId,
  formData,
}: Pick<NoteAPIArgs, "projectId" | "taskId" | "formData">) {
  return apiFetch<string>(
    `/projects/${projectId}/tasks/${taskId}/notes`,
    "POST",
    formData
  );
}

export async function deleteNote({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIArgs, "projectId" | "taskId" | "noteId">) {
  return apiFetch<string>(
    `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`,
    "DELETE"
  );
}
