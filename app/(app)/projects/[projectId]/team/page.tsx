import TeamView from "@/components/app/team/TeamView";
import Loader from "@/components/ui/icons/Loader";
import { Suspense } from "react";

export default async function ProjectTeamPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-center text-4xl font-black uppercase">
          The <span className="text-fuchsia-500">Team</span>
        </h1>
        <p className="mt-2 text-center text-xl font-light text-zinc-500">
          Manage the team for this project
        </p>

        <TeamView projectId={projectId} />
      </div>
    </Suspense>
  );
}
