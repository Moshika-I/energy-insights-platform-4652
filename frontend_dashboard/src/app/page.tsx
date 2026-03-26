"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function HomeInner() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? "/dashboard" : "/login");
  }, [loading, user, router]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
      <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
        <div className="text-sm font-medium">Loading…</div>
        <div className="mt-1 text-xs text-[var(--color-secondary)]">
          Preparing your Energy Insights dashboard.
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeInner />
    </AuthProvider>
  );
}
