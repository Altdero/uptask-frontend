import CreateProjectForm from "@/components/app/projects/CreateProjectForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Project | UpTask",
};

export default function CreateProjectPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-center text-4xl font-black uppercase">
        Create <span className="text-fuchsia-500">Project</span>
      </h1>
      <p className="mt-2 text-center text-xl font-light text-gray-500">
        Fill in the form to create a new project
      </p>
      <nav className="mt-5">
        <Link
          href="/"
          className="font-semibold text-purple-400 transition hover:underline"
        >
          Back to Projects
        </Link>
      </nav>
      <CreateProjectForm />
    </div>
  );
}
