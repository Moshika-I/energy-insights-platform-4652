export type Aggregation = "daily" | "weekly" | "monthly";

export type EnergyPoint = {
  /** ISO date string for the period bucket (or exact timestamp for daily view). */
  periodStart: string;
  /** Consumption in kWh. */
  kwh: number;
  /** Baseline kWh (for comparison). */
  baselineKwh?: number;
  /** If true, point is considered an anomaly. */
  anomaly?: boolean;
};

export type CsvRow = {
  timestamp: string;
  kwh: number;
  cost?: number;
};
