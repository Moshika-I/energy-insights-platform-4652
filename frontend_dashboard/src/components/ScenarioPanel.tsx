"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import type { EnergyPoint } from "@/types/energy";

// PUBLIC_INTERFACE
export function ScenarioPanel({ series }: { series: EnergyPoint[] }) {
  /** Simple scenario simulator estimating savings from percent reduction. */
  const [reductionPct, setReductionPct] = useState<number>(8);

  const totalKwh = useMemo(() => series.reduce((acc, p) => acc + p.kwh, 0), [series]);

  const projectedKwh = useMemo(
    () => totalKwh * (1 - reductionPct / 100),
    [totalKwh, reductionPct]
  );

  // Mock blended rate; replace with backend-derived tariff model.
  const blendedRate = 0.18;
  const baselineCost = totalKwh * blendedRate;
  const projectedCost = projectedKwh * blendedRate;

  return (
    <Card title="Scenario" subtitle="What-if simulation (mock rate)">
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-[var(--color-secondary)]">
            <span>Reduction target</span>
            <span className="font-medium text-[var(--color-primary)]">{reductionPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={25}
            value={reductionPct}
            onChange={(e) => setReductionPct(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
            <div className="text-xs text-[var(--color-secondary)]">Current cost</div>
            <div className="mt-1 text-sm font-semibold">${baselineCost.toFixed(0)}</div>
          </div>
          <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
            <div className="text-xs text-[var(--color-secondary)]">Projected cost</div>
            <div className="mt-1 text-sm font-semibold">${projectedCost.toFixed(0)}</div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-3 ring-1 ring-black/5">
          <div className="text-xs text-[var(--color-secondary)]">Estimated savings</div>
          <div className="mt-1 text-lg font-semibold text-blue-700">
            ${(baselineCost - projectedCost).toFixed(0)}
          </div>
          <div className="mt-1 text-xs text-[var(--color-secondary)]">
            Based on a blended rate of ${blendedRate.toFixed(2)}/kWh (placeholder).
          </div>
        </div>
      </div>
    </Card>
  );
}
