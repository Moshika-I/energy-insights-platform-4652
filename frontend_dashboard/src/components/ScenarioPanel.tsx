"use client";

import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faChartSimple,
  faCircleDollarToSlot,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
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
    <Card title="Scenario" subtitle="What-if simulation (mock rate)" tone="tint">
      <div className="space-y-4">
        <div className="rounded-3xl bg-white/70 p-4 ring-1 ring-black/5 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-secondary)]">
            <span className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faBullseye} className="h-3.5 w-3.5 text-slate-500" />
              Reduction target
            </span>
            <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
              {reductionPct}%
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={25}
            value={reductionPct}
            onChange={(e) => setReductionPct(Number(e.target.value))}
            className="mt-3 w-full accent-blue-600"
            aria-label="Reduction target percentage"
          />

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
              <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-secondary)]">
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faChartSimple} className="h-3.5 w-3.5 text-slate-400" />
                  Total kWh
                </span>
              </div>
              <div className="mt-1 text-sm font-semibold">{totalKwh.toFixed(0)}</div>
            </div>

            <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
              <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-secondary)]">
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faWandMagicSparkles} className="h-3.5 w-3.5 text-slate-400" />
                  Projected kWh
                </span>
              </div>
              <div className="mt-1 text-sm font-semibold">{projectedKwh.toFixed(0)}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-white/70 p-4 ring-1 ring-black/5 shadow-sm backdrop-blur">
            <div className="text-xs text-[var(--color-secondary)]">Current cost</div>
            <div className="mt-1 text-lg font-semibold">${baselineCost.toFixed(0)}</div>
          </div>
          <div className="rounded-3xl bg-white/70 p-4 ring-1 ring-black/5 shadow-sm backdrop-blur">
            <div className="text-xs text-[var(--color-secondary)]">Projected cost</div>
            <div className="mt-1 text-lg font-semibold">${projectedCost.toFixed(0)}</div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-cyan-500/12 to-blue-500/12 p-4 ring-1 ring-black/5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-[var(--color-secondary)]">Estimated savings</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight text-blue-700">
                ${(baselineCost - projectedCost).toFixed(0)}
              </div>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-black/5">
              <FontAwesomeIcon icon={faCircleDollarToSlot} className="h-4 w-4 text-blue-700" />
            </span>
          </div>

          <div className="mt-2 text-xs leading-5 text-[var(--color-secondary)]">
            Based on a blended rate of ${blendedRate.toFixed(2)}/kWh (placeholder).
          </div>
        </div>
      </div>
    </Card>
  );
}
