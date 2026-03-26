import { z } from "zod";
import type { CsvRow } from "@/types/energy";

const NumSchema = z.preprocess((v) => {
  if (typeof v === "string") return v.trim();
  return v;
}, z.coerce.number());

function splitCsvLine(line: string): string[] {
  // Minimal CSV splitting with support for quotes.
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      // Toggle quotes, but handle escaped quotes ("")
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/\s+/g, "_");
}

// PUBLIC_INTERFACE
export function parseEnergyCsv(
  csvText: string
): { ok: true; rows: CsvRow[] } | { ok: false; error: string } {
  /**
   * Parse consumption CSV content into typed rows.
   *
   * Accepts common header variants:
   * - timestamp: timestamp, time, datetime, date
   * - kwh: kwh, kw_h, usage, consumption
   * - cost (optional): cost, price, amount
   */
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) return { ok: false, error: "CSV must contain a header and at least 1 row." };

  const headers = splitCsvLine(lines[0]).map(normalizeHeader);

  const tsIdx =
    headers.findIndex((h) => ["timestamp", "time", "datetime", "date"].includes(h)) ?? -1;
  const kwhIdx =
    headers.findIndex((h) => ["kwh", "kw_h", "usage", "consumption"].includes(h)) ?? -1;
  const costIdx = headers.findIndex((h) => ["cost", "price", "amount"].includes(h));

  if (tsIdx < 0 || kwhIdx < 0) {
    return {
      ok: false,
      error:
        "CSV header must include timestamp/date column and kwh/usage column. Example: timestamp,kwh,cost",
    };
  }

  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    const timestamp = cols[tsIdx] ?? "";
    const kwhRaw = cols[kwhIdx];

    if (!timestamp) continue;

    const dateOk = !Number.isNaN(Date.parse(timestamp));
    if (!dateOk) {
      return { ok: false, error: `Invalid timestamp on line ${i + 1}: "${timestamp}"` };
    }

    const kwhParsed = NumSchema.safeParse(kwhRaw);
    if (!kwhParsed.success || !Number.isFinite(kwhParsed.data)) {
      return { ok: false, error: `Invalid kWh on line ${i + 1}: "${kwhRaw}"` };
    }

    let cost: number | undefined;
    if (costIdx >= 0) {
      const costRaw = cols[costIdx];
      if (costRaw != null && costRaw !== "") {
        const costParsed = NumSchema.safeParse(costRaw);
        if (!costParsed.success || !Number.isFinite(costParsed.data)) {
          return { ok: false, error: `Invalid cost on line ${i + 1}: "${costRaw}"` };
        }
        cost = costParsed.data;
      }
    }

    rows.push({ timestamp, kwh: kwhParsed.data, cost });
  }

  if (!rows.length) return { ok: false, error: "No valid data rows found." };

  return { ok: true, rows };
}
