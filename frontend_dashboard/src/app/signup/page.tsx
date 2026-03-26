"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { MotionPage } from "@/components/MotionPage";
import { AuthTwoPanel } from "@/components/AuthTwoPanel";

function SignupInner() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [loading, user, router]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 py-10">
      <MotionPage className="mx-auto max-w-6xl">
        <AuthTwoPanel initialMode="signup" />
      </MotionPage>
    </main>
  );
}

export default function SignupPage() {
  return (
    <AuthProvider>
      <SignupInner />
    </AuthProvider>
  );
}
