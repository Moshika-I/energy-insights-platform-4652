"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faChartLine,
  faCircleExclamation,
  faCircleNodes,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth, AuthProvider } from "@/contexts/AuthContext";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { EnergyChart } from "@/components/EnergyChart";
import { AlertsPanel } from "@/components/AlertsPanel";
import { InsightsPanel } from "@/components/InsightsPanel";
import { ScenarioPanel } from "@/components/ScenarioPanel";
import { api } from "@/lib/apiClient";
import type { Aggregation, EnergyPoint } from "@/types/energy";
import { generateMockSeries } from "@/lib/mockEnergy";

function DashboardInner() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const prefersReducedMotion = useReducedMotion();

  const [aggregation, setAggregation] = useState<Aggregation>("daily");
  const [series, setSeries] = useState<EnergyPoint[]>(() => generateMockSeries("daily"));
  const [healthStatus, setHealthStatus] = useState<string>("Checking backend…");
  const [backendOk, setBackendOk] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    // Replace mock with backend call once backend implements analytics endpoints.
    setSeries(generateMockSeries(aggregation));
  }, [aggregation]);

  useEffect(() => {
    api
      .health()
      .then(() => {
        setHealthStatus("Backend reachable");
        setBackendOk(true);
      })
      .catch(() => {
        setHealthStatus("Backend unreachable (using mock data)");
        setBackendOk(false);
      });
  }, []);

  const kpi = useMemo(() => {
    const total = series.reduce((acc, p) => acc + p.kwh, 0);
    const avg = series.length ? total / series.length : 0;
    const max = series.reduce((m, p) => Math.max(m, p.kwh), 0);
    return { total, avg, max };
  }, [series]);

  if (loading || (!user && !loading)) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white/80 p-7 ring-1 ring-black/5 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/15 to-cyan-500/15 ring-1 ring-black/5">
              <FontAwesomeIcon icon={faCircleNodes} className="h-5 w-5 text-blue-700" />
            </span>
            <div>
              <div className="text-sm font-semibold tracking-tight">Loading session</div>
              <div className="mt-1 text-xs text-[var(--color-secondary)]">{healthStatus}</div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 26 };

  return (
    <AppShell
      rightPanel={
        <>
          <AlertsPanel />
          <InsightsPanel />
          <ScenarioPanel series={series} />
        </>
      }
    >
      <div className="core-section mx-auto w-full max-w-5xl space-y-6">
        {/* Hero / header */}
        <section className="relative overflow-hidden rounded-[28px] bg-white/75 p-[20px] ring-1 ring-black/5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-blue-800 ring-1 ring-black/5 shadow-sm">
                <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5" />
                Super‑app dashboard
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>

              <p className="mt-2 text-sm leading-6 text-[var(--color-secondary)]">
                {healthStatus}. Switch aggregation to explore daily/weekly/monthly patterns.
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-xs ring-1 ring-black/5">
                <span
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-2 py-1 font-semibold ring-1",
                    backendOk === false
                      ? "bg-red-50 text-red-800 ring-red-600/20"
                      : backendOk === true
                        ? "bg-cyan-50 text-cyan-800 ring-cyan-600/20"
                        : "bg-blue-50 text-blue-800 ring-blue-600/20",
                  ].join(" ")}
                >
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className={["h-3.5 w-3.5", backendOk === true ? "opacity-0 w-0" : ""].join(" ")}
                  />
                  {backendOk === false ? "Mock data mode" : backendOk === true ? "Live connectivity" : "Checking…"}
                </span>
                <span className="text-[var(--color-secondary)]">Data source status</span>
              </div>
            </div>

            {/* Aggregation toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--color-secondary)]">View</span>
              <div className="inline-flex rounded-2xl bg-white/80 p-1 ring-1 ring-black/5 shadow-sm">
                {(["daily", "weekly", "monthly"] as Aggregation[]).map((a) => {
                  const active = a === aggregation;
                  return (
                    <motion.button
                      key={a}
                      type="button"
                      onClick={() => setAggregation(a)}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                      transition={transition}
                      className={[
                        "relative px-4 py-2 text-sm rounded-2xl font-semibold transition",
                        active
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-[var(--color-primary)] hover:bg-black/5",
                      ].join(" ")}
                    >
                      {a[0].toUpperCase() + a.slice(1)}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card title="Total consumption" subtitle="kWh for selected range" tone="tint">
              <div className="flex items-end justify-between gap-3">
                <div className="text-3xl font-semibold tracking-tight">{kpi.total.toFixed(0)}</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
                  <FontAwesomeIcon icon={faChartLine} className="h-4 w-4 text-blue-700" />
                </div>
              </div>
            </Card>

            <Card title="Average per period" subtitle="kWh">
              <div className="text-3xl font-semibold tracking-tight">{kpi.avg.toFixed(1)}</div>
            </Card>

            <Card title="Peak period" subtitle="kWh">
              <div className="text-3xl font-semibold tracking-tight">{kpi.max.toFixed(1)}</div>
            </Card>
          </div>
        </section>

        {/* Core widgets: subtle grid for neat alignment */}
        <section className="widget-grid">
          <Card
            title="Consumption & baseline"
            subtitle="Interactive chart with mock baseline and anomaly markers (wired for backend integration)."
            footer={
              <div className="flex flex-col gap-2 text-xs text-[var(--color-secondary)] sm:flex-row sm:items-end sm:justify-between">
                <span>Tip: upload a CSV to replace mock series.</span>
                <div className="flex justify-end">
                  <a className="cool-link inline-flex items-center gap-2 font-semibold" href="/upload">
                    Upload CSV
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            }
          >
            <EnergyChart aggregation={aggregation} points={series} />
          </Card>

          <Card
            title="Reports & exports"
            subtitle="Quick actions for sharing insights (placeholder)."
            tone="tint"
            footer={
              <div className="flex items-end justify-end">
                <a href="/upload" className="btn-primary inline-flex items-center gap-2">
                  Upload CSV
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
                </a>
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/70 p-[20px] ring-1 ring-black/5 shadow-sm backdrop-blur">
                <div className="text-xs font-semibold text-[var(--color-secondary)]">Energy usage</div>
                <div className="mt-2 text-sm leading-6 text-[var(--color-secondary)]">
                  Export summaries and share baseline vs actual variance.
                </div>
              </div>
              <div className="rounded-3xl bg-white/70 p-[20px] ring-1 ring-black/5 shadow-sm backdrop-blur">
                <div className="text-xs font-semibold text-[var(--color-secondary)]">Analytics</div>
                <div className="mt-2 text-sm leading-6 text-[var(--color-secondary)]">
                  Package charts + key metrics into an internal report.
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

export default function DashboardPage() {
  // AuthProvider is placed here (client) to keep this repo's current minimal layout server-only.
  return (
    <AuthProvider>
      <DashboardInner />
    </AuthProvider>
  );
}
