"use client";

import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { env } from "@/lib/env";

function LoginInner() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [loading, user, router]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 py-10">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 ring-1 ring-black/5">
        <header className="mb-6">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <p className="mt-1 text-sm text-[var(--color-secondary)]">
            Use email/password to access your energy dashboards.
          </p>
        </header>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={env.frontendUrl ? `${env.frontendUrl}/dashboard` : undefined}
        />

        <p className="mt-6 text-xs text-[var(--color-secondary)]">
          If you don’t have an account yet, use “Sign up” above.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginInner />
    </AuthProvider>
  );
}
