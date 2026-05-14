import { fetcher } from "@/src/lib/utils/fetcher";
import useSWR from "swr";
import { z } from "zod";

type GetDataHookProps<T> = {
  url: string | null;
  schema: z.ZodType<T>;
};

export default function useGetData<T>({ url, schema }: GetDataHookProps<T>) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    url ? [url, schema] : null,
    fetcher
  );

  return { data, isLoading, error, mutate };
}
