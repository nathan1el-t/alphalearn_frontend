import { createClient } from "@/lib/supabase/server";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("user not authenticated");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
//   showError('test');
  return res.json();
}
