import { z } from "zod";

export default function validateAPIData<T>(
  fetchData: unknown,
  schema: z.ZodType<T>
): T {
  const res = schema.safeParse(fetchData);
  if (res.success) return res.data;
  throw new Error("Invalid API response");
}
