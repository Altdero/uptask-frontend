"use client";

import { deleteTask } from "@/src/api/TaskAPI";
import { projectSchema } from "@/src/lib/schemas/projectSchema";
import type { TaskProjectType } from "@/src/types";
import { useDraggable } from "@dnd-kit/core";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

type TaskCardProps = {
  task: TaskProjectType;
  canEdit: boolean;
  projectId: string;
  isLast: boolean;
};

export default function TaskCard({
  task,
  canEdit,
  projectId,
  isLast,
}: TaskCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate } = useSWRConfig();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const handleDelete = async () => {
    const loader = toast.loading("Please wait...", { toasterId: "loader" });
    try {
      const message = await deleteTask({ projectId, taskId: task._id });
      toast.success(message, { toasterId: "notifications" });
      await mutate([`/projects/${projectId}`, projectSchema]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { toasterId: "notifications" }
      );
    } finally {
      toast.dismiss(loader);
    }
  };

  return (
    <li
      style={style}
      className="flex justify-between gap-3 rounded-md border border-zinc-200 bg-white shadow-sm"
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="flex min-w-0 cursor-grab flex-col gap-y-2 p-5 pr-0"
      >
        <p className="text-left font-bold text-zinc-700">{task.name}</p>
        <p className="text-zinc-500">{task.description}</p>
      </div>

      <div className="flex shrink-0 items-start gap-x-6 p-5 pl-0">
        <Menu as="div" className="relative flex-none">
          <MenuButton className="-m-2.5 block cursor-pointer p-2.5 text-zinc-500 hover:text-zinc-900">
            <span className="sr-only">options</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </MenuButton>
          <MenuItems
            anchor={isLast ? "left" : "right"}
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-zinc-900/5 focus:outline-none"
          >
            <MenuItem>
              <button
                type="button"
                className="block w-full px-3 py-1 text-left text-sm leading-6 text-zinc-900 data-focus:bg-zinc-50"
                onClick={() => router.push(`${pathname}?viewTask=${task._id}`)}
              >
                View Task
              </button>
            </MenuItem>

            {canEdit && (
              <>
                <MenuItem>
                  <button
                    type="button"
                    className="block w-full px-3 py-1 text-left text-sm leading-6 text-zinc-900 data-focus:bg-zinc-50"
                    onClick={() =>
                      router.push(`${pathname}?editTask=${task._id}`)
                    }
                  >
                    Edit Task
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    type="button"
                    className="block w-full px-3 py-1 text-left text-sm leading-6 text-red-500 data-focus:bg-zinc-50"
                    onClick={handleDelete}
                  >
                    Delete Task
                  </button>
                </MenuItem>
              </>
            )}
          </MenuItems>
        </Menu>
      </div>
    </li>
  );
}
