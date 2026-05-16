import EditProjectForm from "@/components/app/projects/EditProjectForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Project | UpTask",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-center text-4xl font-black uppercase">
        Edit <span className="text-fuchsia-500">Project</span>
      </h1>
      <p className="mt-2 text-center text-xl font-light text-gray-500">
        Update your project details
      </p>
      <nav className="mt-5">
        <Link
          href="/"
          className="font-semibold text-purple-400 transition hover:underline"
        >
          Back to Projects
        </Link>
      </nav>
      <EditProjectForm projectId={projectId} />
    </div>
  );
}
