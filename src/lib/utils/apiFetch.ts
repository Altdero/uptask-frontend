type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiFetch<T>(
  url: string,
  method: Method = "GET",
  body?: unknown
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("AUTH_TOKEN") : null;

  const res = await fetch(`${process.env.API_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(errBody.error ?? "Request failed");
  }

  const text = await res.text();
  if (!text) return null as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
}
