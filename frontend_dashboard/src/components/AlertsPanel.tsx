"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/Card";

type AlertItem = {
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
};

const severityClasses: Record<AlertItem["severity"], string> = {
  low: "bg-cyan-50 text-cyan-800 ring-cyan-600/20",
  medium: "bg-blue-50 text-blue-800 ring-blue-600/20",
  high: "bg-red-50 text-red-800 ring-red-600/20",
};

// PUBLIC_INTERFACE
export function AlertsPanel() {
  /** Shows recent anomaly alerts (mocked until backend websocket/alerts are implemented). */
  const items = useMemo<AlertItem[]>(
    () => [
      {
        title: "Spike detected",
        detail: "Consumption exceeded baseline by ~38% in the last period.",
        severity: "high",
      },
      {
        title: "Off-hours usage",
        detail: "Sustained after-hours load suggests HVAC scheduling issue.",
        severity: "medium",
      },
      {
        title: "Stable trend",
        detail: "No anomalies detected in the previous 3 periods.",
        severity: "low",
      },
    ],
    []
  );

  return (
    <Card title="Alerts" subtitle="Recent anomaly signals (mock)">
      <ul className="space-y-2">
        {items.map((a, idx) => (
          <li
            key={idx}
            className={[
              "rounded-xl p-3 text-sm ring-1",
              severityClasses[a.severity],
            ].join(" ")}
          >
            <div className="font-medium">{a.title}</div>
            <div className="mt-1 text-xs opacity-90">{a.detail}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
