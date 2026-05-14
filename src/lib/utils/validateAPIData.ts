import { z } from "zod";

/**
 * Validates API data using a Zod schema.
 * Use with SWR in Next.js to ensure type-safe data from backend.
 *
 * @param fetchData - The (unknown) data returned from the fetcher
 * @param schema - The Zod schema to validate against
 * @returns Parsed and typed data if valid
 * @throws Error validation message
 */
export default function validateAPIData<T>(
  fetchData: unknown,
  schema: z.ZodType<T>
): T {
  const res = schema.safeParse(fetchData);
  if (res.success) return res.data;
  else throw new Error(res.error.message);
}
