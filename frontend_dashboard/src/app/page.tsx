"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faChartLine,
  faCircleCheck,
  faGaugeHigh,
  faShieldHalved,
  faWandMagicSparkles,
  faArrowRight,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { MotionPage } from "@/components/MotionPage";

function LandingInner() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const prefersReducedMotion = useReducedMotion();

  // If already authenticated, route to dashboard; otherwise show marketing landing.
  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [loading, user, router]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: "easeOut" as const };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="relative overflow-hidden">
        {/* Super-app background */}
        <div className="absolute inset-0 bg-superapp" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-subtle opacity-[0.35]" aria-hidden="true" />

        {/* Floating blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/15 blur-3xl" />
          <div className="absolute -right-52 -top-24 h-[560px] w-[560px] rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute -bottom-56 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-violet-600/12 blur-3xl" />
        </div>

        {/* Top nav */}
        <header className="relative">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-black/5 shadow-sm backdrop-blur">
                <FontAwesomeIcon icon={faBolt} className="h-5 w-5 text-blue-700" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">Energy Insights</div>
                <div className="text-xs text-[var(--color-secondary)]">
                  Analytics for commercial consumption
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-2xl bg-white/70 px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] ring-1 ring-black/10 shadow-sm backdrop-blur transition hover:bg-white"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Create account
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="relative">
          <MotionPage className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:pb-24 sm:pt-12">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-blue-800 ring-1 ring-black/5 shadow-sm backdrop-blur">
                  <FontAwesomeIcon icon={faShieldHalved} className="h-3.5 w-3.5" />
                  Secure authentication with Supabase
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-primary)] sm:text-5xl">
                  A colorful, decision‑ready{" "}
                  <span className="bg-gradient-to-r from-blue-700 via-cyan-600 to-violet-700 bg-clip-text text-transparent">
                    energy super‑dashboard
                  </span>{" "}
                  for teams that run buildings.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-secondary)]">
                  Upload consumption data, detect anomalies, and turn variance into a clear operational plan. Built for
                  commercial teams that need measurable reduction, not noisy charts.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Get started
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--color-primary)] ring-1 ring-black/10 shadow-sm backdrop-blur transition hover:bg-white"
                  >
                    Sign in to dashboard
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: faGaugeHigh,
                      title: "Faster time-to-value",
                      detail: "Spot spikes and drift quickly with clean rollups.",
                      tint: "from-blue-600/10 to-cyan-500/10",
                    },
                    {
                      icon: faChartLine,
                      title: "Baselines that explain",
                      detail: "Compare consumption to a consistent reference.",
                      tint: "from-violet-600/10 to-pink-500/10",
                    },
                    {
                      icon: faWandMagicSparkles,
                      title: "Actions, not just charts",
                      detail: "Prioritized recommendations your team can execute.",
                      tint: "from-cyan-500/10 to-blue-600/10",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-3xl bg-white/75 p-5 ring-1 ring-black/5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
                    >
                      <div
                        aria-hidden="true"
                        className={[
                          "pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-2xl",
                          `bg-gradient-to-br ${item.tint}`,
                        ].join(" ")}
                      />
                      <div className="relative flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
                          <FontAwesomeIcon icon={item.icon} className="h-4 w-4 text-blue-700" />
                        </div>
                        <div className="text-sm font-semibold">{item.title}</div>
                      </div>
                      <div className="relative mt-3 text-sm leading-6 text-[var(--color-secondary)]">
                        {item.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero card */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[28px] bg-white/80 p-6 ring-1 ring-black/5 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10"
                  />

                  <div className="relative flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold tracking-tight">Executive snapshot</div>
                      <div className="mt-1 text-sm text-[var(--color-secondary)]">
                        Example metrics for a typical site
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-600/20">
                      <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5" />
                      Demo
                    </div>
                  </div>

                  <div className="relative mt-6 grid grid-cols-3 gap-3">
                    {[
                      { k: "1,248", v: "kWh variance" },
                      { k: "6.4%", v: "savings target" },
                      { k: "3", v: "active alerts" },
                    ].map((s) => (
                      <div
                        key={s.v}
                        className="rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm"
                      >
                        <div className="text-lg font-semibold">{s.k}</div>
                        <div className="mt-1 text-[11px] leading-4 text-[var(--color-secondary)]">{s.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 p-4 ring-1 ring-black/5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-black/5">
                        <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Recommended next action</div>
                        <div className="mt-1 text-sm leading-6 text-[var(--color-secondary)]">
                          Investigate off-hours HVAC scheduling. Estimated reduction: 4–7% monthly.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between gap-3 rounded-2xl bg-slate-950 px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                      <FontAwesomeIcon icon={faWandMagicSparkles} className="h-3.5 w-3.5 text-white/70" />
                      Super‑app workflow
                    </div>
                    <div className="text-xs text-white/70">Upload → Baseline → Alerts → Scenarios</div>
                  </div>

                  <div className="relative mt-4 text-xs text-[var(--color-secondary)]">
                    Connect real data via CSV upload to populate dashboards.
                  </div>
                </div>
              </motion.div>
            </div>
          </MotionPage>
        </section>
      </div>

      {/* Feature section */}
      <section className="border-t border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              Built for commercial energy teams
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-secondary)]">
              A clear workflow from ingestion to decision: upload, baseline, detect, explain, and simulate—designed for
              operational clarity.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Upload & normalize",
                detail:
                  "Import CSV consumption data and standardize timestamps and kWh for consistent analysis.",
                icon: faBolt,
                tint: "from-blue-600/10 to-cyan-500/10",
              },
              {
                title: "Detect anomalies",
                detail:
                  "Identify spikes and off-hours usage against a baseline to surface actionable signals.",
                icon: faChartLine,
                tint: "from-violet-600/10 to-pink-500/10",
              },
              {
                title: "Model scenarios",
                detail:
                  "Run what-if reductions to estimate cost impact and support investment decisions.",
                icon: faGaugeHigh,
                tint: "from-cyan-500/10 to-blue-600/10",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-[28px] bg-white p-6 ring-1 ring-black/5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
              >
                <div
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-2xl",
                    `bg-gradient-to-br ${f.tint}`,
                  ].join(" ")}
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
                  <FontAwesomeIcon icon={f.icon} className="h-5 w-5 text-blue-700" />
                </div>
                <div className="relative mt-5 text-sm font-semibold">{f.title}</div>
                <div className="relative mt-2 text-sm leading-6 text-[var(--color-secondary)]">
                  {f.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[28px] bg-gradient-to-br from-blue-600/10 via-white to-cyan-500/10 p-7 ring-1 ring-black/5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center">
            <div>
              <div className="text-sm font-semibold">Ready to benchmark your site?</div>
              <div className="mt-1 text-sm text-[var(--color-secondary)]">
                Create an account and start exploring your consumption patterns.
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/signup"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary)] ring-1 ring-black/10 transition hover:bg-black/5"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-[var(--color-background)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-[var(--color-secondary)]">
            © {new Date().getFullYear()} Energy Insights Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-[var(--color-secondary)]">
            <Link href="/login" className="hover:underline">
              Sign in
            </Link>
            <Link href="/signup" className="hover:underline">
              Create account
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <LandingInner />
    </AuthProvider>
  );
}
