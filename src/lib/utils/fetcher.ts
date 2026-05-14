import { UnauthorizedError } from "@/src/lib/utils/errors";
import validateAPIData from "@/src/lib/utils/validateAPIData";
import { z } from "zod";

export const fetcher = async <T>(
  args: string | [string, z.ZodType<T>]
): Promise<T> => {
  const url = Array.isArray(args) ? args[0] : args;
  const schema = Array.isArray(args) ? args[1] : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("AUTH_TOKEN") : null;

  const res = await fetch(`${process.env.API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("AUTH_TOKEN");
      throw new UnauthorizedError();
    }
    const body = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(body.error ?? "Request failed");
  }

  const json = await res.json();
  if (schema) return validateAPIData(json, schema);
  return json;
};
