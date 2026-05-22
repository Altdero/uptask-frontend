import useGetData from "@/src/hooks/useGetData";
import { userSchema } from "@/src/lib/schemas/authSchema";
import { projectSchema } from "@/src/lib/schemas/projectSchema";
import { useMemo } from "react";

export default function useCanEdit(projectId: string) {
  const { data: project } = useGetData({
    url: `/projects/${projectId}`,
    schema: projectSchema,
  });

  const { data: user } = useGetData({
    url: "/auth/user",
    schema: userSchema,
  });

  return useMemo(
    () => project?.manager === user?._id,
    [project?.manager, user?._id]
  );
}
