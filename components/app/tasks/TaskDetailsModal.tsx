"use client";

import NotesPanel from "@/components/app/notes/NotesPanel";
import Loader from "@/components/ui/icons/Loader";
import { updateStatus } from "@/src/api/TaskAPI";
import { TASK_STATUSES } from "@/src/constants/taskStatus";
import useGetData from "@/src/hooks/useGetData";
import { projectSchema } from "@/src/lib/schemas/projectSchema";
import { taskSchema } from "@/src/lib/schemas/taskSchema";
import { formatDate } from "@/src/lib/utils/formatDate";
import type { TaskStatusType } from "@/src/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import type { ChangeEvent } from "react";
import { useSWRConfig } from "swr";

type TaskModalDetailsProps = {
  projectId: string;
};

export default function TaskDetailsModal({ projectId }: TaskModalDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("viewTask");
  const show = !!taskId;
  const { mutate } = useSWRConfig();

  const { data, mutate: taskMutate } = useGetData({
    url: taskId ? `/projects/${projectId}/tasks/${taskId}` : null,
    schema: taskSchema,
  });

  const handleClose = () => router.replace(pathname);

  const handleStatusChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatusType;
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await updateStatus({
        projectId,
        taskId: taskId!,
        status,
      });
      toast.dismiss(loader);
      toast.success(message, { toasterId: "notifications" });
      await taskMutate();
      await mutate([`/projects/${projectId}`, projectSchema]);
    } catch (error) {
      toast.dismiss(loader);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    }
  };

  if (!show) return null;

  return (
    <Dialog open={show} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-8 md:p-12">
            {data ? (
              <>
                <p className="text-sm text-zinc-400">
                  Added: {formatDate(data.createdAt)}
                </p>
                <p className="text-sm text-zinc-400">
                  Last updated: {formatDate(data.updatedAt)}
                </p>

                <DialogTitle as="h3" className="mt-5 text-3xl font-black">
                  {data.name}
                </DialogTitle>

                <p className="mt-1 text-lg text-zinc-500">
                  Description: {data.description}
                </p>

                {data.completedBy.length > 0 && (
                  <>
                    <p className="mt-5 text-2xl font-bold text-zinc-700">
                      Change History
                    </p>
                    <ul className="mt-3 list-decimal pl-5">
                      {data.completedBy.map((log) => (
                        <li key={log._id}>
                          <span className="font-semibold text-zinc-700">
                            {TASK_STATUSES[log.status]}
                          </span>
                          {" by "}
                          {log.user.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="mt-5 flex flex-col gap-2">
                  <label
                    htmlFor="currentStatus"
                    className="text-sm font-bold uppercase"
                  >
                    Current Status:
                  </label>
                  <select
                    key={data.status}
                    id="currentStatus"
                    defaultValue={data.status}
                    className="w-full border border-zinc-300 p-3 placeholder-zinc-400"
                    onChange={handleStatusChange}
                  >
                    {Object.entries(TASK_STATUSES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-10">
                  <NotesPanel
                    notes={data.notes}
                    projectId={projectId}
                    taskId={taskId!}
                  />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
