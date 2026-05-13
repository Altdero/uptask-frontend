import { apiFetch } from "@/src/lib/utils/apiFetch";
import type {
  NoteType,
  NoteFormDataType,
  ProjectType,
  TaskType,
} from "@/src/types";

type NoteAPIArgs = {
  projectId: ProjectType["_id"];
  taskId: TaskType["_id"];
  noteId: NoteType["_id"];
  formData: NoteFormDataType;
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
