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
    : { duration: 0.5, ease: "easeOut" as const };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid-subtle opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -right-40 -bottom-40 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        {/* Top nav */}
        <header className="relative">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/15 to-cyan-500/15 ring-1 ring-black/5">
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
                className="rounded-xl px-4 py-2 text-sm font-semibold text-[var(--color-primary)] ring-1 ring-black/10 transition hover:bg-black/5"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Create account
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="relative">
          <MotionPage className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:pb-20 sm:pt-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-black/5">
                  <FontAwesomeIcon icon={faShieldHalved} className="h-3.5 w-3.5" />
                  Secure authentication with Supabase
                </div>

                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--color-primary)] sm:text-5xl">
                  Reduce energy waste with{" "}
                  <span className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                    baseline analytics
                  </span>{" "}
                  and anomaly detection.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-secondary)]">
                  Upload consumption data, detect abnormal spikes, and prioritize operational fixes with
                  decision-ready insights. Built for commercial teams that need measurable reduction and
                  clear reporting.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Get started
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary)] ring-1 ring-black/10 transition hover:bg-black/5"
                  >
                    Sign in to dashboard
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { icon: faGaugeHigh, title: "Fast time-to-value", detail: "Find spikes in days, not weeks." },
                    { icon: faChartLine, title: "Trends + baselines", detail: "Daily, weekly, monthly rollups." },
                    { icon: faWandMagicSparkles, title: "Actionable insights", detail: "Prioritized recommendations." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-white p-4 ring-1 ring-black/5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 ring-1 ring-black/5">
                          <FontAwesomeIcon icon={item.icon} className="h-4 w-4 text-blue-700" />
                        </div>
                        <div className="text-sm font-semibold">{item.title}</div>
                      </div>
                      <div className="mt-2 text-xs leading-5 text-[var(--color-secondary)]">{item.detail}</div>
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
                <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Executive snapshot</div>
                      <div className="mt-1 text-xs text-[var(--color-secondary)]">
                        Example metrics for a typical site
                      </div>
                    </div>
                    <div className="rounded-2xl bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-600/20">
                      Demo
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { k: "1,248", v: "kWh variance" },
                      { k: "6.4%", v: "savings target" },
                      { k: "3", v: "active alerts" },
                    ].map((s) => (
                      <div key={s.v} className="rounded-2xl bg-[var(--color-background)] p-4 ring-1 ring-black/5">
                        <div className="text-lg font-semibold">{s.k}</div>
                        <div className="mt-1 text-[11px] leading-4 text-[var(--color-secondary)]">{s.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 p-4 ring-1 ring-black/5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 ring-1 ring-black/5">
                        <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Recommended next action</div>
                        <div className="mt-1 text-xs leading-5 text-[var(--color-secondary)]">
                          Investigate off-hours HVAC scheduling. Estimated reduction: 4–7% monthly.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-[var(--color-secondary)]">
                    Connect real data via CSV upload to populate dashboards.
                  </div>
                </div>
              </motion.div>
            </div>
          </MotionPage>
        </section>
      </div>

      {/* Feature section */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">Built for commercial energy teams</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-secondary)]">
              A clean workflow from ingestion to decision: upload, baseline, detect, explain, and simulate.
              Designed for clarity, not noise.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Upload & normalize",
                detail:
                  "Import CSV consumption data and standardize timestamps and kWh for consistent analysis.",
                icon: faBolt,
              },
              {
                title: "Detect anomalies",
                detail:
                  "Identify spikes and off-hours usage against a baseline to surface actionable signals.",
                icon: faChartLine,
              },
              {
                title: "Model scenarios",
                detail:
                  "Run what-if reductions to estimate cost impact and support investment decisions.",
                icon: faGaugeHigh,
              },
            ].map((f) => (
              <div key={f.title} className="rounded-3xl bg-[var(--color-background)] p-6 ring-1 ring-black/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
                  <FontAwesomeIcon icon={f.icon} className="h-5 w-5 text-blue-700" />
                </div>
                <div className="mt-4 text-sm font-semibold">{f.title}</div>
                <div className="mt-2 text-sm leading-6 text-[var(--color-secondary)]">{f.detail}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 p-6 ring-1 ring-black/5 sm:flex-row sm:items-center">
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
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
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
