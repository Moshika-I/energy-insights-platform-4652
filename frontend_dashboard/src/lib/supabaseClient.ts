import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

let _client: SupabaseClient | null = null;

// PUBLIC_INTERFACE
export function getSupabaseBrowserClient(): SupabaseClient {
  /**
   * Returns a singleton Supabase client for browser/client components.
   *
   * Environment variables required:
   * - NEXT_PUBLIC_SUPABASE_URL
   * - NEXT_PUBLIC_SUPABASE_KEY (anon key)
   */
  if (_client) return _client;

  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    // We intentionally throw to fail fast during development if env is missing.
    throw new Error(
      "Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY."
    );
  }

  _client = createClient(env.supabaseUrl, env.supabaseAnonKey);
  return _client;
}
