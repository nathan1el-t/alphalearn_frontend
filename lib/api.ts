import { getServerSession } from "@/lib/auth/session";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const session = await getServerSession();

  if (!session) {
    throw new Error("user not authenticated");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // console.log(session.access_token);
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const statusFallback = `Request failed (${res.status}${res.statusText ? ` ${res.statusText}` : ""})`;
    const rawBody = await res.text();

    if (!rawBody) {
      throw new Error(statusFallback);
    }

    try {
      const errbody = JSON.parse(rawBody) as { message?: string };
      throw new Error(errbody.message || statusFallback);
    } catch {
      throw new Error(rawBody || statusFallback);
    }
  }

  // Handle 204 No Content 
  if (res.status === 204) {
    return null as T;
  }

  return res.json();
}
