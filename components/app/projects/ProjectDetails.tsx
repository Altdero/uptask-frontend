"use client";

import AddTaskModal from "@/components/app/tasks/AddTaskModal";
import EditTaskData from "@/components/app/tasks/EditTaskData";
import TaskDetailsModal from "@/components/app/tasks/TaskDetailsModal";
import TaskList from "@/components/app/tasks/TaskList";
import Loader from "@/components/ui/icons/Loader";
import useCanEdit from "@/src/hooks/useCanEdit";
import useGetData from "@/src/hooks/useGetData";
import { projectSchema } from "@/src/lib/schemas/projectSchema";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type ProjectDetailsProps = {
  projectId: string;
};

export default function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data,
    isLoading: loadingProject,
    mutate: projectMutate,
  } = useGetData({
    url: `/projects/${projectId}`,
    schema: projectSchema,
  });

  const canEdit = useCanEdit(projectId);

  if (loadingProject) return <Loader />;
  if (!data) return null;

  return (
    <>
      <h1 className="text-4xl font-black">{data.projectName}</h1>
      <p className="mt-2 text-xl font-light text-zinc-500">
        {data.description}
      </p>

      <nav className="my-5 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="font-semibold text-purple-400 transition hover:underline"
        >
          Back to Projects
        </Link>
        <div className="flex gap-3">
          {canEdit && (
            <button
              type="button"
              className="cursor-pointer rounded-xl border-2 border-purple-500 bg-purple-50 px-3 py-1 font-semibold text-purple-500 uppercase transition hover:bg-purple-500 hover:text-white disabled:opacity-50 md:px-6 md:py-2 md:text-lg"
              onClick={() => router.push(`${pathname}?newTask=true`)}
            >
              Add Task
            </button>
          )}

          <Link
            href={`/projects/${projectId}/team`}
            className="cursor-pointer rounded-xl border-2 border-fuchsia-500 bg-fuchsia-50 px-3 py-1 font-semibold text-fuchsia-500 uppercase transition hover:bg-fuchsia-500 hover:text-white disabled:opacity-50 md:px-6 md:py-2 md:text-lg"
          >
            Team
          </Link>
        </div>
      </nav>

      <TaskList
        tasks={data.tasks}
        canEdit={canEdit}
        projectId={projectId}
        projectMutate={projectMutate}
      />

      <AddTaskModal projectId={projectId} projectMutate={projectMutate} />
      <EditTaskData projectId={projectId} projectMutate={projectMutate} />
      <TaskDetailsModal projectId={projectId} projectMutate={projectMutate} />
    </>
  );
}
