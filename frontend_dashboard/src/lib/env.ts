export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "",
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL ?? "",
};
