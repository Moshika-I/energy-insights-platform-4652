"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { MotionPage } from "@/components/MotionPage";
import { AuthTwoPanel } from "@/components/AuthTwoPanel";

function LoginInner() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [loading, user, router]);

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-superapp" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-subtle opacity-[0.35]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-56 -top-56 h-[680px] w-[680px] rounded-full bg-blue-600/15 blur-3xl" />
          <div className="absolute -right-56 -bottom-56 h-[680px] w-[680px] rounded-full bg-cyan-500/14 blur-3xl" />
        </div>

        <MotionPage className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <AuthTwoPanel initialMode="login" />
        </MotionPage>
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
