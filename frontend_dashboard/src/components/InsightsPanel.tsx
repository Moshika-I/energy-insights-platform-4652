"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faClock,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "@/components/Card";

// PUBLIC_INTERFACE
export function InsightsPanel() {
  /** Actionable insights panel (mocked until backend insights endpoint exists). */
  const items = [
    {
      icon: faClock,
      title: "Tune HVAC start time",
      detail: "Shift warm-up by 30 minutes to reduce early peak load.",
    },
    {
      icon: faBoltLightning,
      title: "Reduce standby loads",
      detail: "Identify equipment drawing power overnight; expected savings 5–8%.",
    },
    {
      icon: faSliders,
      title: "Peak shaving opportunity",
      detail: "Consider staggering high-demand processes during peak price windows.",
    },
  ] as const;

  return (
    <Card title="Insights" subtitle="Actionable recommendations (mock)" tone="tint">
      <div className="space-y-2.5 text-sm">
        {items.map((it) => (
          <div
            key={it.title}
            className="flex items-start gap-3 rounded-3xl bg-white/70 p-3.5 ring-1 ring-black/5 shadow-sm backdrop-blur"
          >
            <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
              <FontAwesomeIcon icon={it.icon} className="h-4 w-4 text-blue-700" />
            </span>
            <div className="min-w-0">
              <div className="font-semibold">{it.title}</div>
              <div className="mt-1 text-xs leading-5 text-[var(--color-secondary)]">{it.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
