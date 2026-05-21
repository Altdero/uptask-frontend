import AddNoteForm from "@/components/app/notes/AddNoteForm";
import NoteDetail from "@/components/app/notes/NoteDetail";
import type { NoteType, ProjectType, TaskType } from "@/src/types";

type NotesPanelProps = {
  notes: NoteType[];
  projectId: ProjectType["_id"];
  taskId: TaskType["_id"];
};

export default function NotesPanel({
  notes,
  projectId,
  taskId,
}: NotesPanelProps) {
  return (
    <>
      <p className="text-2xl font-bold text-zinc-700">Notes</p>
      <AddNoteForm projectId={projectId} taskId={taskId} />
      <div className="mt-6 divide-y divide-zinc-200">
        {notes.length ? (
          notes.map((note) => (
            <NoteDetail
              key={note._id}
              note={note}
              projectId={projectId}
              taskId={taskId}
            />
          ))
        ) : (
          <p className="pt-3 text-center text-zinc-500">No notes</p>
        )}
      </div>
    </>
  );
}
