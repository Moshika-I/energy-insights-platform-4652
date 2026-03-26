import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-superapp" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-subtle opacity-[0.35]" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-3xl items-center justify-center px-4 py-16">
          <section
            className="w-full overflow-hidden rounded-[28px] bg-white/80 p-8 ring-1 ring-black/5 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur"
            role="alert"
            aria-live="assertive"
          >
            <h1 className="text-2xl font-semibold tracking-tight">
              404 — Page not found
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--color-secondary)]">
              The page you’re looking for doesn’t exist or may have moved.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] ring-1 ring-black/10 hover:bg-black/5"
              >
                Back to landing
              </Link>
              <Link
                href="/dashboard"
                className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Go to dashboard
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
