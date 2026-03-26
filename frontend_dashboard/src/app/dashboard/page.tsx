"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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

  const [aggregation, setAggregation] = useState<Aggregation>("daily");
  const [series, setSeries] = useState<EnergyPoint[]>(() => generateMockSeries("daily"));
  const [healthStatus, setHealthStatus] = useState<string>("Checking backend…");

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
      .then(() => setHealthStatus("Backend reachable"))
      .catch(() => setHealthStatus("Backend unreachable (using mock data)"));
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
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <div className="text-sm font-medium">Loading session…</div>
          <div className="mt-1 text-xs text-[var(--color-secondary)]">{healthStatus}</div>
        </div>
      </main>
    );
  }

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
      <div className="space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-gray-50 p-4 ring-1 ring-black/5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <p className="mt-1 text-sm text-[var(--color-secondary)]">
                {healthStatus}. Switch aggregation to explore daily/weekly/monthly patterns.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-secondary)]">View</span>
              <div className="inline-flex rounded-xl bg-white ring-1 ring-black/5">
                {(["daily", "weekly", "monthly"] as Aggregation[]).map((a) => {
                  const active = a === aggregation;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAggregation(a)}
                      className={[
                        "px-3 py-2 text-sm rounded-xl transition",
                        active ? "bg-blue-600 text-white" : "text-[var(--color-primary)] hover:bg-black/5",
                      ].join(" ")}
                    >
                      {a[0].toUpperCase() + a.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Card title="Total consumption" subtitle="kWh for selected range">
              <div className="text-2xl font-semibold">{kpi.total.toFixed(0)}</div>
            </Card>
            <Card title="Average per period" subtitle="kWh">
              <div className="text-2xl font-semibold">{kpi.avg.toFixed(1)}</div>
            </Card>
            <Card title="Peak period" subtitle="kWh">
              <div className="text-2xl font-semibold">{kpi.max.toFixed(1)}</div>
            </Card>
          </div>
        </div>

        <Card
          title="Consumption & baseline"
          subtitle="Interactive chart with mock baseline and anomaly markers (wired for backend integration)."
          footer={
            <div className="flex items-center justify-between text-xs text-[var(--color-secondary)]">
              <span>Tip: upload a CSV to replace mock series.</span>
              <a className="text-blue-700 hover:underline" href="/upload">
                Upload CSV →
              </a>
            </div>
          }
        >
          <EnergyChart aggregation={aggregation} points={series} />
        </Card>
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
