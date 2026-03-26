"use client";

import React, { useMemo } from "react";
import type { Aggregation, EnergyPoint } from "@/types/energy";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

// PUBLIC_INTERFACE
export function EnergyChart({
  aggregation,
  points,
}: {
  aggregation: Aggregation;
  points: EnergyPoint[];
}) {
  /** Chart.js line chart showing consumption and baseline. */
  const labels = useMemo(() => points.map((p) => p.periodStart), [points]);
  const consumption = useMemo(() => points.map((p) => p.kwh), [points]);
  const baseline = useMemo(() => points.map((p) => p.baselineKwh ?? null), [points]);
  const anomalyMask = useMemo(() => points.map((p) => (p.anomaly ? p.kwh : null)), [points]);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Consumption (kWh)",
          data: consumption,
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.12)",
          fill: true,
          tension: 0.25,
          pointRadius: 2,
        },
        {
          label: "Baseline (kWh)",
          data: baseline,
          borderColor: "rgba(100, 116, 139, 1)",
          backgroundColor: "rgba(100, 116, 139, 0.08)",
          borderDash: [6, 6],
          pointRadius: 0,
          tension: 0.25,
        },
        {
          label: "Anomaly",
          data: anomalyMask,
          borderColor: "rgba(239, 68, 68, 1)",
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          showLine: false,
          pointRadius: 5,
          pointHoverRadius: 6,
        },
      ],
    }),
    [labels, consumption, baseline, anomalyMask]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false as const,
      plugins: {
        legend: { display: true as const, position: "bottom" as const },
        tooltip: {
          callbacks: {
            title: (items: { label: string }[]) => items[0]?.label ?? "",
          },
        },
      },
      scales: {
        y: {
          ticks: { color: "rgba(17,24,39,0.7)" },
          grid: { color: "rgba(0,0,0,0.06)" },
          title: { display: true as const, text: "kWh" },
        },
        x: {
          ticks: { color: "rgba(17,24,39,0.6)", maxRotation: 0, autoSkip: true },
          grid: { display: false as const },
        },
      },
    }),
    []
  );

  const height =
    aggregation === "daily" ? "h-[360px]" : aggregation === "weekly" ? "h-[360px]" : "h-[360px]";

  return (
    <div className={["w-full", height].join(" ")}>
      <Line data={data} options={options} />
    </div>
  );
}
