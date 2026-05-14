import { fetcher } from "@/src/lib/utils/fetcher";
import useSWR from "swr";
import { useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";

type GetDataHookProps<T> = {
  url: string | null;
  schema: z.ZodType<T>;
};

export default function useGetData<T>({ url, schema }: GetDataHookProps<T>) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    url ? [url, schema] : null,
    fetcher
  );

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong, please try again.", {
        toasterId: "notifications",
      });
    }
  }, [error]);

  return { data, isLoading, error, mutate };
}
