"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCloudArrowUp,
  faMagnifyingGlassChart,
  faBell,
  faCircleCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

/**
 * Landing page (marketing) content.
 * - If authenticated, redirects to /dashboard.
 * - Otherwise shows a dark SaaS hero + features + how-it-works per spec.
 */
function LandingInner() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const prefersReducedMotion = useReducedMotion();

  // If already authenticated, route to dashboard; otherwise show marketing landing.
  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [loading, user, router]);

  const baseTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: "easeOut" as const };

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { ...baseTransition, delay },
    }),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background gradient + subtle grid */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#050B1E] via-slate-950 to-slate-950"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.22]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at 50% 24%, black 0%, black 44%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 24%, black 0%, black 44%, transparent 72%)",
          }}
        />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-56 -top-56 h-[620px] w-[620px] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-56 -top-40 h-[640px] w-[640px] rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-72 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        {/* Top nav */}
        <header className="relative">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-sm backdrop-blur transition group-hover:bg-white/8">
                <FontAwesomeIcon icon={faBolt} className="h-5 w-5 text-cyan-200" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-slate-100">
                  Energy Insights
                </div>
                <div className="text-xs text-slate-300/80">
                  Commercial energy analytics
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10 hover:ring-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Create Account
              </Link>
            </nav>
          </div>
        </header>

        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:pb-24 sm:pt-14">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 ring-1 ring-white/10 backdrop-blur"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/90" />
                Modern anomaly detection for energy teams
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.08}
                className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
              >
                Detect anomalies, forecast demand, and{" "}
                <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                  reduce energy costs
                </span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.16}
                className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg"
              >
                Upload your consumption data, uncover unusual patterns, and get notified when usage drifts.
                Built for commercial operations that need clear actions—not noisy dashboards.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.24}
                className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
              >
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_40px_rgba(34,211,238,0.16)] transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Create Account
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>

            {/* Optional: subtle preview card under hero for “modern dashboard look” */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...baseTransition, delay: 0.28 }}
              className="mx-auto mt-12 max-w-5xl"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-cyan-400/10"
                />
                <div className="relative grid gap-4 md:grid-cols-3">
                  {[
                    { k: "Real-time", v: "alerting workflow" },
                    { k: "CSV-first", v: "fast onboarding" },
                    { k: "Actionable", v: "insights & targets" },
                  ].map((s) => (
                    <div
                      key={s.v}
                      className="rounded-2xl bg-slate-950/30 p-4 ring-1 ring-white/10"
                    >
                      <div className="text-sm font-semibold text-slate-50">{s.k}</div>
                      <div className="mt-1 text-xs text-slate-300/90">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES: 3 CARDS */}
      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Built for a clean, fast workflow
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              A modern SaaS experience: minimal, responsive, and focused on decisions.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Anomaly Detection",
                detail: "Detect spikes and unusual patterns.",
                icon: faMagnifyingGlassChart,
                accent: "from-blue-500/25 to-cyan-400/10",
              },
              {
                title: "Fast CSV Upload",
                detail: "Upload energy data easily.",
                icon: faCloudArrowUp,
                accent: "from-indigo-500/20 to-blue-500/10",
              },
              {
                title: "Smart Alerts",
                detail: "Get notified on unusual usage.",
                icon: faBell,
                accent: "from-cyan-400/20 to-indigo-500/10",
              },
            ].map((f, idx) => (
              <motion.div
                key={f.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ ...baseTransition, delay: idx * 0.06 }}
                className="group relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-white/15"
              >
                <div
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl",
                    `bg-gradient-to-br ${f.accent}`,
                  ].join(" ")}
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/8">
                  <FontAwesomeIcon icon={f.icon} className="h-5 w-5 text-cyan-200" />
                </div>
                <div className="relative mt-5 text-base font-semibold text-slate-50">
                  {f.title}
                </div>
                <div className="relative mt-2 text-sm leading-6 text-slate-300">
                  {f.detail}
                </div>

                <div className="relative mt-5 h-px w-full bg-gradient-to-r from-white/0 via-white/12 to-white/0" />
                <div className="relative mt-4 flex items-center gap-2 text-xs font-semibold text-slate-200/90">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-cyan-200/90" />
                  Designed for commercial energy teams
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: 3 STEPS */}
      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              How it Works
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              A simple step-by-step flow from data to action.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload CSV data",
                detail: "Bring your consumption history into one place in minutes.",
                icon: faCloudArrowUp,
              },
              {
                step: "02",
                title: "Analyze energy usage",
                detail: "See trends, baselines, and unusual patterns clearly.",
                icon: faMagnifyingGlassChart,
              },
              {
                step: "03",
                title: "Get anomaly alerts",
                detail: "Receive notifications when usage spikes or drifts off baseline.",
                icon: faBell,
              },
            ].map((s, idx) => (
              <motion.div
                key={s.step}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ ...baseTransition, delay: idx * 0.06 }}
                className="relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-white/15"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/8"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-slate-300/80">
                      STEP {s.step}
                    </div>
                    <div className="mt-2 text-base font-semibold text-slate-50">
                      {s.title}
                    </div>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <FontAwesomeIcon icon={s.icon} className="h-5 w-5 text-cyan-200" />
                  </div>
                </div>
                <div className="relative mt-3 text-sm leading-6 text-slate-300">
                  {s.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-500/15 via-white/5 to-cyan-400/10 p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-base font-semibold text-slate-50">
                  Start with your first upload
                </div>
                <div className="mt-1 text-sm text-slate-300">
                  Create an account to access the dashboard, upload data, and begin tracking anomalies.
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 sm:w-auto"
                >
                  Create Account
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10 sm:w-auto"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Energy Insights Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link href="/login" className="transition hover:text-slate-200 hover:underline">
              Sign In
            </Link>
            <Link href="/signup" className="transition hover:text-slate-200 hover:underline">
              Create Account
            </Link>
            <Link href="/dashboard" className="transition hover:text-slate-200 hover:underline">
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
