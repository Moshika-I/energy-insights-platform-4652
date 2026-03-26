"use client";

import React from "react";
import { Card } from "@/components/Card";

// PUBLIC_INTERFACE
export function InsightsPanel() {
  /** Actionable insights panel (mocked until backend insights endpoint exists). */
  return (
    <Card title="Insights" subtitle="Actionable recommendations (mock)">
      <div className="space-y-3 text-sm">
        <div className="rounded-xl bg-white ring-1 ring-black/5 p-3">
          <div className="font-medium">Tune HVAC start time</div>
          <div className="mt-1 text-xs text-[var(--color-secondary)]">
            Shift warm-up by 30 minutes to reduce early peak load.
          </div>
        </div>
        <div className="rounded-xl bg-white ring-1 ring-black/5 p-3">
          <div className="font-medium">Reduce standby loads</div>
          <div className="mt-1 text-xs text-[var(--color-secondary)]">
            Identify equipment drawing power overnight; expected savings 5–8%.
          </div>
        </div>
        <div className="rounded-xl bg-white ring-1 ring-black/5 p-3">
          <div className="font-medium">Peak shaving opportunity</div>
          <div className="mt-1 text-xs text-[var(--color-secondary)]">
            Consider staggering high-demand processes during peak price windows.
          </div>
        </div>
      </div>
    </Card>
  );
}
