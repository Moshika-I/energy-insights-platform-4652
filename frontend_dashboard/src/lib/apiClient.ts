import { z } from "zod";
import { env } from "@/lib/env";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function getAuthHeader(): Promise<Record<string, string>> {
  try {
    const supabase = getSupabaseBrowserClient();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
}

async function requestJSON<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
  init?: RequestInit
): Promise<z.infer<TSchema>> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "Missing backend base url. Set NEXT_PUBLIC_API_BASE or NEXT_PUBLIC_BACKEND_URL."
    );
  }

  const authHeader = await getAuthHeader();
  const res = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
      ...authHeader,
    },
    cache: "no-store",
  });

  const text = await res.text();
  const maybeJson = text ? safeJsonParse(text) : null;

  if (!res.ok) {
    throw new ApiError(
      `API request failed: ${res.status} ${res.statusText}`,
      res.status,
      maybeJson ?? text
    );
  }

  const parsed = schema.safeParse(maybeJson ?? {});
  if (!parsed.success) {
    throw new ApiError("API response validation failed", 500, parsed.error.flatten());
  }
  return parsed.data;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const HealthResponseSchema = z.any();

// PUBLIC_INTERFACE
export const api = {
  /**
   * Minimal typed wrapper around backend_api.
   *
   * NOTE: Backend currently provides only GET /. As the backend grows, extend this module
   * with more endpoints + zod schemas.
   */
  health: async () => requestJSON("/", HealthResponseSchema, { method: "GET" }),
};
