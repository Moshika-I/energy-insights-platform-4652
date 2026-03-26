import { addDays, addMonths, addWeeks, formatISO } from "date-fns";
import type { Aggregation, EnergyPoint } from "@/types/energy";

function rand(seed: number) {
  // Simple deterministic PRNG
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// PUBLIC_INTERFACE
export function generateMockSeries(aggregation: Aggregation): EnergyPoint[] {
  /** Generate a deterministic mock time series with baseline + occasional anomalies. */
  const now = new Date();
  const points: EnergyPoint[] = [];
  const count = aggregation === "daily" ? 30 : aggregation === "weekly" ? 16 : 12;

  for (let i = count - 1; i >= 0; i--) {
    const periodStart =
      aggregation === "daily"
        ? addDays(now, -i)
        : aggregation === "weekly"
          ? addWeeks(now, -i)
          : addMonths(now, -i);

    const base = aggregation === "daily" ? 120 : aggregation === "weekly" ? 850 : 3600;
    const noise = (rand(i + 10) - 0.5) * base * 0.18;
    const baselineKwh = base + (rand(i + 99) - 0.5) * base * 0.05;

    let kwh = baselineKwh + noise;
    const anomaly = rand(i + 123) > 0.92;
    if (anomaly) kwh += base * (0.35 + rand(i + 7) * 0.35);

    points.push({
      periodStart: formatISO(periodStart, { representation: "date" }),
      kwh: Math.max(0, kwh),
      baselineKwh: Math.max(0, baselineKwh),
      anomaly,
    });
  }

  return points;
}
