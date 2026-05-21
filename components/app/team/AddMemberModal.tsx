"use client";

import AddMemberForm from "@/components/app/team/AddMemberForm";
import type { ProjectType, TeamMembersType } from "@/src/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { KeyedMutator } from "swr";

type AddMemberModalProps = {
  projectId: ProjectType["_id"];
  teamMutate: KeyedMutator<TeamMembersType>;
};

export default function AddMemberModal({
  projectId,
  teamMutate,
}: AddMemberModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const show = !!searchParams.get("addMember");

  const handleClose = () => router.replace(pathname);

  if (!show) return null;

  return (
    <Dialog open={show} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-8 md:p-12">
            <DialogTitle as="h3" className="text-3xl font-black">
              Add Team Member
            </DialogTitle>
            <p className="mt-2 text-lg">
              Search by email{" "}
              <span className="font-semibold text-fuchsia-600">
                to add to the project
              </span>
            </p>
            <AddMemberForm projectId={projectId} teamMutate={teamMutate} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
