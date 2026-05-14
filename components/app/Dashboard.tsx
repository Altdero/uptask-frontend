"use client";

import Loader from "@/components/ui/icons/Loader";
import useGetData from "@/src/hooks/useGetData";
import { userSchema } from "@/src/lib/schemas/authSchema";
import { dashboardProjectSchema } from "@/src/lib/schemas/projectSchema";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

const isManager = (managerId: string, userId: string) => managerId === userId;

export default function Dashboard() {
  const router = useRouter();

  const { data: projects, isLoading: loadingProjects } = useGetData({
    url: "/projects",
    schema: dashboardProjectSchema,
  });

  const { data: user, isLoading: loadingUser } = useGetData({
    url: "/auth/user",
    schema: userSchema,
  });

  if (loadingProjects || loadingUser) return <Loader />;

  if (!projects || !user) return null;

  return (
    <>
      {projects.length > 0 && (
        <nav className="mt-5">
          <Link
            href="/projects/create"
            className="font-semibold text-purple-400 transition hover:underline"
          >
            New Project
          </Link>
        </nav>
      )}

      {projects.length ? (
        <div className="mt-6 flex flex-col gap-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex justify-between gap-x-6 rounded-xl border border-zinc-200 bg-zinc-50 p-6 shadow-lg"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="flex min-w-0 flex-col">
                  <p className="text-3xl font-bold text-zinc-800">
                    {project.projectName}
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-600">
                    Client:{" "}
                    <span className="text-zinc-500">{project.clientName}</span>
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {project.description}
                  </p>
                  {isManager(project.manager, user._id) ? (
                    <p className="mt-4 inline-block w-fit rounded-lg border-2 border-indigo-500 bg-indigo-50 px-5 py-1 text-xs font-bold text-indigo-500 uppercase">
                      Manager
                    </p>
                  ) : (
                    <p className="mt-4 inline-block w-fit rounded-lg border-2 border-green-500 bg-green-50 px-5 py-1 text-xs font-bold text-green-500 uppercase">
                      Collaborator
                    </p>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block cursor-pointer p-2.5 text-zinc-500 hover:text-zinc-900">
                    <span className="sr-only">options</span>
                    <EllipsisVerticalIcon
                      className="h-9 w-9"
                      aria-hidden="true"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-zinc-900/5 focus:outline-none">
                    <MenuItem>
                      <Link
                        href={`/projects/${project._id}`}
                        className="block px-3 py-1 text-sm leading-6 text-zinc-900 data-focus:bg-zinc-50"
                      >
                        View Project
                      </Link>
                    </MenuItem>

                    {isManager(project.manager, user._id) && (
                      <>
                        <MenuItem>
                          <Link
                            href={`/projects/${project._id}/edit`}
                            className="block px-3 py-1 text-sm leading-6 text-zinc-900 data-focus:bg-zinc-50"
                          >
                            Edit Project
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <button
                            type="button"
                            className="block w-full px-3 py-1 text-left text-sm leading-6 text-red-500 data-focus:bg-zinc-50"
                            onClick={() =>
                              router.push(`?deleteProject=${project._id}`)
                            }
                          >
                            Delete Project
                          </button>
                        </MenuItem>
                      </>
                    )}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-20 text-center">
          No projects yet.{" "}
          <Link
            href="/projects/create"
            className="font-semibold text-purple-400 transition hover:underline"
          >
            Create project
          </Link>
        </p>
      )}
    </>
  );
}
