"use client";

import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faFireFlameCurved,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "@/components/Card";

type AlertItem = {
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
};

const severityClasses: Record<AlertItem["severity"], string> = {
  low: "bg-cyan-50 text-cyan-900 ring-cyan-600/20",
  medium: "bg-blue-50 text-blue-900 ring-blue-600/20",
  high: "bg-red-50 text-red-900 ring-red-600/20",
};

function alertIcon(severity: AlertItem["severity"]) {
  if (severity === "high") return faFireFlameCurved;
  if (severity === "medium") return faCircleExclamation;
  return faMoon;
}

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
    <Card title="Alerts" subtitle="Recent anomaly signals (mock)" tone="tint">
      <ul className="space-y-2.5">
        {items.map((a, idx) => (
          <li
            key={idx}
            className={[
              "flex items-start gap-3 rounded-3xl p-3.5 text-sm ring-1 shadow-sm",
              "bg-white/70 backdrop-blur",
              severityClasses[a.severity],
            ].join(" ")}
          >
            <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
              <FontAwesomeIcon icon={alertIcon(a.severity)} className="h-4 w-4 text-slate-700" />
            </span>

            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold">{a.title}</div>
                <span className="shrink-0 rounded-full bg-black/5 px-2 py-1 text-[11px] font-semibold text-[var(--color-secondary)]">
                  {a.severity.toUpperCase()}
                </span>
              </div>
              <div className="mt-1 text-xs leading-5 text-[var(--color-secondary)]">{a.detail}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
