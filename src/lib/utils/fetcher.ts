export const fetcher = async <T>(url: string): Promise<T> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("AUTH_TOKEN") : null;

  const res = await fetch(`${process.env.API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(body.error ?? "Request failed");
  }

  return (await res.json()) as Promise<T>;
};
