import ProjectDetails from "@/components/app/projects/ProjectDetails";
import Loader from "@/components/ui/icons/Loader";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Project Details | UpTask",
};

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto w-full max-w-6xl">
        <ProjectDetails projectId={projectId} />
      </div>
    </Suspense>
  );
}
